import './assets/main.css'
import './assets/fork-awesome/css/fork-awesome.css'

import { io } from "socket.io-client";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
