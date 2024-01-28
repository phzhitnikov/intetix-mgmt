REM Add this file to %AppData%\Microsoft\Windows\Start Menu\Programs\Startup

@echo off
set PROJECT_PATH="%HOMEDRIVE%%HOMEPATH%\Desktop\intetix-mgmt"

cd /D "%PROJECT_PATH%\client-system"
start npm start

exit