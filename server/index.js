const Server = require("socket.io").Server;
const wol = require('wake_on_lan');

const utils = require('./utils.js');
const config = require('./config.js');
const {ClientManager} = require("./client_manager");

const io = new Server({transports: ["websocket"]});

// socket_id -> node_name mapping
let nodesOnline = {};

let clientManager = new ClientManager(io, config.scadaNode);

function send(dest, action, arg) {
    switch (action) {
        case "wakeup":
            // Send Wake-on-LAN packet to node's mac address
            let mac = config.macs[dest];
            if (!mac) {
                console.error(`No MAC address found for node group: ${dest}. Check config`);
                break;
            }

            wol.wake(mac, {address: config.lanBroadcastAddress}, (error) => {
                if (error) {
                    console.error(`Failed to send WoL packet to ${mac}:`, error);
                } else {
                    console.log(`Sent WoL packet to ${mac}`);
                }
            });
            break;

        default:
            // Resend packet to node group
            console.log(`[${dest}] <- ${action} ${JSON.stringify(arg)}`)
            io.to(dest).emit(action, arg);
    }
}

io.on('connect', function (socket) {
    console.log("Client connected: ", socket.id);

    // For usage in logs
    let sender = socket.id

    let log = (...msg) => { console.log(`[${sender}]`, ...msg) };
    let log_error = (...msg) => { console.error(`[${sender}]`, ...msg) };

    // Assign specific room to client. Room = node name
    socket.on('join', (rawNodeName) => {
        let node = clientManager.add(socket.id, rawNodeName);
        sender = node.fullName
        log("Node connected");

        // Join room for node group
        socket.join(node.group);

        // If scada was connected,
        if (node.name === config.scadaNode) {
            // - report all online nodes
            clientManager.informScada();
        }
    });

    // Handle disconnection
    socket.on('disconnecting', () => {
        clientManager.remove(socket.id)
    })

    // Handle messages from scada page
    socket.on('control', (packet) => {
        log('Received control packet:', packet);

        // Validate the packet
        let p = utils.parsePacket(packet, "node", "action");
        if (!p) return;

        // Send the same action to all connected nodes
        if (p.node.group === "broadcast") {
            // Edge case for wakeup for disconnected nodes
            if (p.action === "wakeup") {
                for (let node in config.macs) {
                    send(node, p.action, p.arg);
                }
            } else {
                clientManager.clients.forEach(node => send(node.group, p.action, p.arg));
            }
        } else {
            send(p.node.group, p.action, p.arg);
        }
    });

    // Handle error events from nodes
    socket.on('error', (message) => {
        log_error("Got error:", message);
    });

    // Default handler
    socket.on('message', (message) => {
        log("Received message:", message);
    });
});

io.listen(config.port ?? 8082);
