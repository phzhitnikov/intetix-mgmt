const { io } = require("socket.io-client");
const config = require('./config.js')
const utils = require('./utils.js')


let socket = io(config.serverUrl, {transports: ["websocket"]});

socket.on('connect',() => {
    console.log("Connected!");

    // Present yourself to server
    socket.emit('join', config.node);
});

// Handle commands
socket.on('reboot',() => {
    console.log("Received reboot command");
    if (config.mode === 'production')
        utils.reboot();
});

socket.on('halt', () => {
    console.log("Received halt command");
    if (config.mode === 'production')
        utils.halt();
});

socket.on('message',function(message){
    console.log("Received:", message);
});

