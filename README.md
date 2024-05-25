# Overview
Project consists of several subprojects:
- server - master node that help other nodes to communicate with each other
- scada - web-service for controlling the nodes through the browser (reboot/halt/sleep/wake node, run content)
- client-system - slave node that handles the halt/reboot commands on the device where it runs on
- client - slave node that can show content (image/videos)

# Requirements:
1) For client (possibly only for MacOS): use Thorium browser (Chromium fork), because Chrome/Chromium removed autoplay-policy flag, 
   so video autoplay is not available.
   
2) Scada can be opened in any browser basically

# Configuration
1) For server node set the static IP address or domain name
2) For each node, prepare config.js:
   - set `serverUrl` matching your server address
   - set unique `nodeName` for each node. NB: `broadcast` name is reserved
   - set other config parameters, see comments in config.js
3) For client, copy your content files to `images` or `videos` folder
   
- [//]: # (TODO: overview of scada config)

# Scada installation
1) Install [Node v18](https://nodejs.org/download/release/v18.19.0/) on both build & target PC
2) Install dependencies and create build: `npm install && npm run build`
3) Transfer `dist` folder on target PC
4) On target PC, install serve package: `npm install -G serve`
5) Run on target PC: `npx serve <project folder>`
6) Open scada in browser: `http://<target-pc-ip>:3000`

# Client installation
1) Install:
    - [Node v18](https://nodejs.org/download/release/v18.19.0/)
    - [Thorium Browser](https://thorium.rocks/)
2) From project folder, install dependencies and create build: `npm install && npm run build`
3) Transfer `dist` folder on target PC
4) On target PC, install serve package: `npm install -G serve`
5) On target PC,
   run: `start <thorium path> --disable-features=Translate --no-first-run --noerrdialogs --hide-crash-restore-bubble --autoplay-policy=no-user-gesture-required -disable-pinch --kiosk --app="http://127.0.0.1:3000/" && npx serve dist`

# Client-system / server installation
1) Install [Node v18](https://nodejs.org/download/release/v18.19.0/)
2) Install dependencies: `npm install`
3) Run project: `npm start`

# Configure Wake-on-LAN (WLAN) for client-system 
- PC needs to be powered from AC, not from battery
- Network adapter -> Properties -> Advanced -> Allow all settings about WoL
- Network adapter -> Properties -> Power Management -> Allow this device to wake the computer
- In BIOS - allow all settings about WoL

# Disable sign-in on wake
- Run CMD in admin mode
- Run `powercfg /SETACVALUEINDEX SCHEME_CURRENT SUB_NONE CONSOLELOCK 0`
- Reboot the PC


# Конфиги
- showcase-1 - Витрина 1 (включение, перезагрузка)
- showcase-2 - Витрина 2 (включение, перезагрузка)
- stove - Печка (включение, перезагрузка, автозапуск видео standby.mp4)
- bolotov-painting - Картина Болотова (включение, перезагрузка, автозапуск видео standby.mp4, запуск контента video.mp4)
- library - Библиотека (включение, перезагрузка)
- children-theatre - Детский театр (включение, перезагрузка, автозапуск видео standby.mp4, запуск контента video.mp4)
- park-organizer - Устроитель парков (включение, перезагрузка, автозапуск видео standby.mp4, запуск контента video.mp4)
- gaming-floor - Игровой пол (включение, перезагрузка)
- molbert - Мольберт (включение, перезагрузка, автозапуск видео standby.mp4)
- model - Макет (включение, перезагрузка)
- interactive-book - Интерактивная книга (включение, перезагрузка)