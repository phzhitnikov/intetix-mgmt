import './assets/main.css'
import './assets/fork-awesome/css/fork-awesome.css'

import { io } from "socket.io-client";
import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import config from "@/config.js";
import { store } from '@/store/index.js'

const app = createApp(App)

app.use(router)


// Connect to SocketIO server
let socket = io(config.serverUrl, {transports: ["websocket"]});

socket.on("connect", () => {
    console.log("Connected to server");

    // Present yourself to server
    socket.emit('join', config.node);
});

socket.on("online", (nodeName, value) => {
    console.log("Got online update:", nodeName, value);
    store.onlineStatuses[nodeName] = value;
})

socket.on("clear_online", () => {
    store.onlineStatuses = {}
})

app.config.globalProperties.$socket = socket;
app.config.globalProperties.$store = store;

app.mount('#app')
