@echo off
cd /d "%~dp0"
echo 경영회의 자료 뷰어를 시작합니다...
start "" http://localhost:8787
python server.py 8787
