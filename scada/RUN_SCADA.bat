@echo off

call npm run build
start npx serve dist
exit