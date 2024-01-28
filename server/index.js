const Server = require("socket.io").Server;
const utils = require('./utils.js');
const config = require('./config.js');

const io = new Server({transports: ["websocket"]});

// socket_id -> node_name mapping
let nodesOnline = {};

function updateOnlineStatus(nodeName, status, clear = false) {
    io.to(config.scadaNode).emit("online", nodeName, status, clear);
}

io.on('connect', function (socket) {
    console.log("Client connected: ", socket.id);

    // Assign specific room to client. Room = node name
    socket.on('join', (nodeName) => {
        console.log("Node connected:", nodeName);
        socket.join(nodeName);

        // If scada was connected, report all online nodes
        if (nodeName === config.scadaNode) {
            // First, clear online mapping in scada node
            updateOnlineStatus(config.scadaNode, true, true);

            // Tell the scada online statuses of all regular (non-scada) nodes
            for (const nodeName of Object.values(nodesOnline).filter(v => v !== config.scadaNode)) {
                updateOnlineStatus(nodeName, true);
            }
        }
        // If regular node connected, tell the scada to update node's online status
        else {
            nodesOnline[socket.id] = nodeName;
            updateOnlineStatus(nodeName, true);
        }
    });

    // Handle disconnection
    socket.on('disconnecting', () => {
        // Find node name in mapping
        let nodeName = nodesOnline[socket.id];
        if (nodeName) {
            console.log("Node disconnected:", nodeName);

            // Tell the scada to update node's online status
            if (nodeName !== config.scadaNode)
                updateOnlineStatus(nodeName, false);

            // Update nodes map
            delete nodesOnline[socket.id];
        }
    })

    // Handle messages from scada page
    socket.on('control', (packet) => {
        console.log('Received control packet:', packet);

        // Parse the packet and resend to client
        let parsed = utils.parsePacket(packet);
        if (parsed) {
            socket.to(parsed["node"]).emit(parsed["action"], parsed["arg"])
        }
    });

    // Handle error events from nodes
    socket.on('error', (message) => {
        console.error("Got error:", message);
    });
});

io.listen(config.port ?? 8082);
