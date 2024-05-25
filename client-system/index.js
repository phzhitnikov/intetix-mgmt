const {io} = require("socket.io-client");

const config = require('./config.js')
const utils = require('./utils.js')


let socket = io(config.serverUrl, {transports: ["websocket"]});

socket.on('connect', async () => {
    console.log("Connected to server!");

    // Present yourself to server
    socket.emit('join', config.node);
});

// Handle power commands
socket.on('reboot', () => {
    console.log("Received reboot command");
    if (!config.debugMode)
        utils.reboot();
});

socket.on('halt', () => {
    console.log("Received halt command");

    if (!config.debugMode)
        utils.halt();

});

socket.on('sleep', () => {
    console.log("Received sleep command");
    if (!config.debugMode)
        utils.sleep();
});

socket.on('message', function (message) {
    console.log("Received:", message);
});

