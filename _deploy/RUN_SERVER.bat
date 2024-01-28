@echo off
set PROJECT_PATH="%HOMEDRIVE%%HOMEPATH%\Desktop\intetix-mgmt"

cd /D "%PROJECT_PATH%\server\"
start npm start

cd /D "%PROJECT_PATH%\scada\"
start npx serve dist

exit