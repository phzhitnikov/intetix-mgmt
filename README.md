# Overview
Project consists of several subprojects:
- server - master node that help other nodes to communicate with each other
- scada - web-service for controlling the nodes through the browser (reboot node / halt node / run content)
- client-system - slave node that handles the halt/reboot commands on node where it runs
- client - slave node that can show content (image/videos)

# Requirements:
1) For client: use Thorium browser (Chromium fork), because Chrome/Chromium removed autoplay-policy flag, 
   so video autoplay is not available.
   
2) Scada can be opened in any browser basically

# Configuration
1) For server node set the static IP address or domain name
2) For each node, prepare config.js:
   - set `serverUrl` matching your server address
   - set unique `nodeName` for each node
   - set other config parameters, see comments in config.js
3) For client, copy your content files to `images` or `videos` folder
   
- [//]: # (TODO: overview of scada config)

# Scada installation
1) Install [Node v16](https://nodejs.org/download/release/v16.20.2/)
2) Install dependencies and create build: `npm install && npm run build`
3) Transfer `dist` folder on target PC
4) Run on target PC: `npx serve <project folder>`
5) Open scada in browser: `http://<target-pc-ip>:3000`

# Client installation
1) Install:
    - [Node v16](https://nodejs.org/download/release/v16.20.2/)
    - [Thorium Browser](https://thorium.rocks/)
2) From project folder, install dependencies and create build: `npm install && npm run build`
3) Transfer `dist` folder on target PC
4) On target PC, install serve package: `npm install -D serve`
5) On target PC,
   run: `start <thorium path> --noerrdialogs --hide-crash-restore-bubble --autoplay-policy=no-user-gesture-required --kiosk --app="http://127.0.0.1:3000/" && npx serve dist`

# Client-system / server installation
1) Install [Node v16](https://nodejs.org/download/release/v16.20.2/)
2) Install dependencies: `npm install`
3) Run project: `npm start`
