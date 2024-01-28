REM Add this file to %AppData%\Microsoft\Windows\Start Menu\Programs\Startup

@echo off
set PROJECT_PATH="%HOMEDRIVE%%HOMEPATH%\Desktop\intetix-mgmt"

cd /D "%PROJECT_PATH%\client"
start npx serve dist
timeout 10
start chrome --disable-features=Translate --no-first-run --noerrdialogs --hide-crash-restore-bubble --autoplay-policy=no-user-gesture-required -disable-pinch --kiosk --app="http://localhost:3000/"

exit