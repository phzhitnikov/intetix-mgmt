export default {
    // server_url: "http://intetix-mgmt-server:8082",
    serverUrl: "http://localhost:8082",
    node: "scada",

    nodes: [
        {
            name: "showcase-1",
            title: "Витрина 1",
            position: {x: "48%", y: "72%"}
        },
        {
            name: "stove",
            title: "Печка",
            position: {x: "65%", y: "72%"}
        },
        {
            name: "bolotov-painting",
            title: "Картина Болотова",
            position: {x: "76%", y: "72%"},
            actions: [
                {name: "play_video", arg: {name: "video.mp4"}, icon: "fa-video", help_text: "Запустить видео X"}
            ]
        },
        {
            name: "cabinet",
            title: "Шкаф",
            position: {x: "70%", y: "62%"}
        },
        {
            name: "children-theatre",
            title: "Детский театр",
            position: {x: "74%", y: "43%"},
            actions: [
                {name: "play_video", arg: {name: "video.mp4"}, icon: "fa-video", help_text: "Запустить видео X"},
                {name: "reset", icon: "fa-window-close", help_text: "Сброс"}
            ]
        },
        {
            name: "park-organizer",
            title: "Устроитель парков",
            position: {x: "63%", y: "40%"},
            actions: [
                {name: "play_video", arg: {name: "video.mp4"}, icon: "fa-video", help_text: "Запустить видео X"}
            ]
        },
        {
            name: "game-floor",
            title: "Игровой пол",
            position: {x: "53.5%", y: "47%"}
        },
        {
            name: "painting",
            title: "Картина с пейзажами",
            position: {x: "45%", y: "40%"}
        },
        {
            name: "showcase-2",
            title: "Витрина 2",
            position: {x: "47%", y: "18%"}
        },
        {
            name: "model",
            title: "Макет",
            position: {x: "38%", y: "28%"}
        },
        {
            name: "grass-book",
            title: "Книга с травами",
            position: {x: "30%", y: "38%"}
        }
    ]
};
