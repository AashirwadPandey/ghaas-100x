@echo off
setlocal
set NODE=C:\Users\aashi\Downloads\prjct\.tools\node\node20\node.exe
cd /d %~dp0\..\apps\web
"%NODE%" .\node_modules\next\dist\bin\next build
"%NODE%" .\node_modules\next\dist\bin\next start -H 127.0.0.1 -p 3002
