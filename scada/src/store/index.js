import {reactive} from 'vue'

export const store = reactive({
    // Online status of each connected node
    onlineStatuses: {},

    actionDescription: {
        "halt": "Выключить",
        "wakeup": "Включить",
        "reboot": "Перезагрузить",
        "sleep": "Перевести в спящий режим",
    }
})