import http.server
import json
import os
import re
import socketserver
import sys
from urllib.parse import unquote

ROOT = os.path.dirname(os.path.abspath(__file__))
REPORTS_DIR = os.path.join(ROOT, "reports")
UPLOADS_INDEX = os.path.join(REPORTS_DIR, "uploads.json")

os.makedirs(REPORTS_DIR, exist_ok=True)


def load_uploads():
    if not os.path.exists(UPLOADS_INDEX):
        return []
    try:
        with open(UPLOADS_INDEX, "r", encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError):
        return []


def save_uploads(uploads):
    with open(UPLOADS_INDEX, "w", encoding="utf-8") as f:
        json.dump(uploads, f, ensure_ascii=False, indent=2)


SAFE_ID_RE = re.compile(r"^[A-Za-z0-9_-]+$")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def _send_json(self, status, payload):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = self.path.split("?", 1)[0]
        if path == "/api/uploads":
            self._send_json(200, load_uploads())
            return
        super().do_GET()

    def do_POST(self):
        path = self.path.split("?", 1)[0]
        if path == "/api/upload":
            self._handle_upload()
            return
        if path == "/api/delete":
            self._handle_delete()
            return
        self.send_error(404)

    def _handle_upload(self):
        try:
            year = int(self.headers.get("X-Year", "0"))
            month = int(self.headers.get("X-Month", "0"))
            filename = unquote(self.headers.get("X-Filename", "upload.pdf"))
            label = unquote(self.headers.get("X-Label", ""))
            length = int(self.headers.get("Content-Length", "0"))
            if not (1 <= month <= 12) or year < 1900 or length <= 0:
                self._send_json(400, {"error": "invalid metadata"})
                return

            data = self.rfile.read(length)

            report_id = f"upload-{year:04d}-{month:02d}"
            file_rel = f"reports/{report_id}.pdf"
            file_abs = os.path.join(ROOT, "reports", f"{report_id}.pdf")
            with open(file_abs, "wb") as f:
                f.write(data)

            uploads = load_uploads()
            uploads = [u for u in uploads if u.get("id") != report_id]
            entry = {
                "id": report_id,
                "label": label or f"{year}년 {month}월 경영회의 (업로드)",
                "year": year,
                "month": month,
                "file": file_rel,
                "filename": filename,
                "addedAt": int(__import__("time").time() * 1000),
            }
            uploads.append(entry)
            save_uploads(uploads)
            self._send_json(200, entry)
        except Exception as e:
            self._send_json(500, {"error": str(e)})

    def _handle_delete(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            body = json.loads(self.rfile.read(length) or b"{}")
            report_id = body.get("id", "")
            if not report_id or not SAFE_ID_RE.match(report_id):
                self._send_json(400, {"error": "invalid id"})
                return

            uploads = load_uploads()
            remaining = [u for u in uploads if u.get("id") != report_id]
            if len(remaining) == len(uploads):
                self._send_json(404, {"error": "not found"})
                return
            save_uploads(remaining)

            file_abs = os.path.join(ROOT, "reports", f"{report_id}.pdf")
            if os.path.exists(file_abs):
                os.remove(file_abs)

            self._send_json(200, {"ok": True})
        except Exception as e:
            self._send_json(500, {"error": str(e)})


class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def _running_under_streamlit():
    try:
        from streamlit import runtime
    except ImportError:
        return False
    return runtime.exists()


if __name__ == "__main__" and _running_under_streamlit():
    # Streamlit Cloud 가 이 파일을 진입점으로 실행한 경우: 웹서버 대신 Streamlit 앱을 띄운다.
    import runpy
    runpy.run_path(os.path.join(ROOT, "streamlit_app.py"), run_name="__main__")
elif __name__ == "__main__":
    port =int(sys.argv[1]) if len(sys.argv) > 1 else 8787
    with ThreadingHTTPServer(("0.0.0.0", port), Handler) as httpd:
        print(f"경영회의 자료 뷰어 서버 실행 중: http://0.0.0.0:{port}")
        httpd.serve_forever()
