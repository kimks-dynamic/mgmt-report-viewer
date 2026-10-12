"""경영회의 자료 뷰어 — Streamlit 버전 (Streamlit Community Cloud 배포용).

로컬에서 기존 HTML 뷰어를 쓰려면 실행.bat (python server.py 8787) 을 그대로 쓰면 된다.
"""
import json
import os
import re
import time

import pypdfium2 as pdfium
import streamlit as st
import streamlit.components.v1 as components

ROOT = os.path.dirname(os.path.abspath(__file__))
REPORTS_DIR = os.path.join(ROOT, "reports")
UPLOADS_INDEX = os.path.join(REPORTS_DIR, "uploads.json")
MANIFEST = os.path.join(ROOT, "manifest.json")

os.makedirs(REPORTS_DIR, exist_ok=True)

st.set_page_config(page_title="경영회의 자료 뷰어", page_icon="📊", layout="wide")


# ---------- 데이터 ----------
def read_json(path):
    if not os.path.exists(path):
        return []
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return []


def save_uploads(uploads):
    with open(UPLOADS_INDEX, "w", encoding="utf-8") as f:
        json.dump(uploads, f, ensure_ascii=False, indent=2)


def load_reports():
    reports = [dict(r, kind=r.get("kind", "native")) for r in read_json(MANIFEST)]
    reports += [dict(u, kind="pdf") for u in read_json(UPLOADS_INDEX)]
    reports.sort(key=lambda r: ((r.get("year") or 0) * 100 + (r.get("month") or 0), r.get("addedAt") or 0),
                 reverse=True)
    return reports


# ---------- HTML 보고서 (report-YYYY-MM.html) ----------
LINK_RE = re.compile(r'<link rel="stylesheet" href="([^"?]+)(?:\?[^"]*)?">')
SCRIPT_RE = re.compile(r'<script src="([^"?]+)(?:\?[^"]*)?"></script>')


def _read_text(rel):
    with open(os.path.join(ROOT, rel), "r", encoding="utf-8") as f:
        return f.read()


@st.cache_data(show_spinner=False)
def inline_report(file_rel, mtime):
    """외부 CSS/JS를 모두 인라인해서 한 장짜리 HTML로 만든다 (components.html 은 상대경로를 못 읽음)."""
    html = _read_text(file_rel)
    html = LINK_RE.sub(lambda m: "<style>\n" + _read_text(m.group(1)) + "\n</style>", html)

    def script(m):
        js = _read_text(m.group(1))
        if m.group(1) == "report-nav.js":
            # Streamlit 안에서는 항상 iframe 이라 '임베드 모드'로 툴바가 숨겨진다 → 단독 모드로 강제
            js = js.replace("const embedded = window.parent !== window;", "const embedded = false;")
        return "<script>\n" + js.replace("</script", "<\\/script") + "\n</script>"

    return SCRIPT_RE.sub(script, html)


def show_native(report):
    file_rel = report["file"]
    mtime = os.path.getmtime(os.path.join(ROOT, file_rel))
    html = inline_report(file_rel, mtime)
    if hasattr(st, "iframe"):
        st.iframe(html, height=900)
    else:  # 구버전 Streamlit
        components.html(html, height=900, scrolling=True)


# ---------- PDF 보고서 ----------
@st.cache_data(show_spinner="PDF 페이지를 그리는 중...", max_entries=8)
def render_pdf(path, mtime, scale=2.0):
    pdf = pdfium.PdfDocument(path)
    try:
        pages = []
        for i in range(len(pdf)):
            img = pdf[i].render(scale=scale).to_pil()
            pages.append(img)
        return pages
    finally:
        pdf.close()


def show_pdf(report):
    path = os.path.join(ROOT, report["file"])
    if not os.path.exists(path):
        st.error("PDF 파일을 찾을 수 없습니다. (클라우드 앱이 재시작되면 업로드한 파일이 사라질 수 있습니다)")
        return
    with open(path, "rb") as f:
        st.download_button("PDF 다운로드", f.read(), file_name=report.get("filename") or os.path.basename(path),
                           mime="application/pdf")
    pages = render_pdf(path, os.path.getmtime(path))
    for i, img in enumerate(pages, 1):
        st.image(img, caption=f"{i} / {len(pages)}", width="stretch")


# ---------- 업로드 / 삭제 ----------
def upload_form():
    with st.sidebar.expander("＋ 경영회의 자료 업로드"):
        with st.form("upload", clear_on_submit=True):
            file = st.file_uploader("PDF 파일", type=["pdf"])
            now = time.localtime()
            c1, c2 = st.columns(2)
            year = c1.number_input("연도", min_value=1900, max_value=2100, value=now.tm_year, step=1)
            month = c2.number_input("월", min_value=1, max_value=12, value=now.tm_mon, step=1)
            label = st.text_input("표시 이름 (선택)")
            submitted = st.form_submit_button("업로드")
        st.caption("클라우드에서는 앱이 재시작되면 업로드한 파일이 사라집니다. "
                   "계속 보관할 자료는 GitHub 저장소의 reports/ 폴더에 올려 주세요.")
    if submitted:
        if file is None:
            st.sidebar.warning("PDF 파일을 선택해 주세요.")
            return
        year, month = int(year), int(month)
        report_id = f"upload-{year:04d}-{month:02d}"
        with open(os.path.join(REPORTS_DIR, f"{report_id}.pdf"), "wb") as f:
            f.write(file.getbuffer())
        uploads = [u for u in read_json(UPLOADS_INDEX) if u.get("id") != report_id]
        uploads.append({
            "id": report_id,
            "label": label or f"{year}년 {month}월 경영회의 (업로드)",
            "year": year,
            "month": month,
            "file": f"reports/{report_id}.pdf",
            "filename": file.name,
            "addedAt": int(time.time() * 1000),
        })
        save_uploads(uploads)
        st.session_state.selected = report_id
        st.rerun()


def delete_upload(report_id):
    save_uploads([u for u in read_json(UPLOADS_INDEX) if u.get("id") != report_id])
    path = os.path.join(REPORTS_DIR, f"{report_id}.pdf")
    if os.path.exists(path):
        os.remove(path)
    st.session_state.pop("selected", None)


# ---------- 화면 ----------
st.sidebar.markdown("**:red[대외비]**")
st.sidebar.title("경영회의 자료")
upload_form()

reports = load_reports()
if not reports:
    st.info("등록된 자료가 없습니다. 왼쪽에서 경영회의 자료를 업로드해 주세요.")
    st.stop()

by_id = {r["id"]: r for r in reports}
ids = list(by_id)
if st.session_state.get("selected") not in by_id:
    st.session_state.selected = ids[0]

selected = st.sidebar.radio("월별 자료 목록", ids, key="selected", format_func=lambda i: by_id[i]["label"])
report = by_id[selected]

head, action = st.columns([6, 1])
head.subheader(report["label"])
if report["kind"] == "pdf" and not report.get("builtin"):
    action.button("삭제", on_click=delete_upload, args=(report["id"],), width="stretch")

if report["kind"] == "native":
    show_native(report)
else:
    show_pdf(report)
