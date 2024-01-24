# Requirements:
1) For client: Chrome / Chromium removed autoplay-policy flag, so video autoplay is not available.
   Use Thorium browser

2) Scada can be opened in any browser basically

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
