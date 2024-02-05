@echo off

call npm run build
start npx serve dist
timeout 10
start chrome --disable-features=Translate --no-first-run --noerrdialogs --hide-crash-restore-bubble --autoplay-policy=no-user-gesture-required -disable-pinch --kiosk --app="http://localhost:3000/"

exit