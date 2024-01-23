// Packet schema:
// {
//   "node": "node1",
//   "action": "play_video",
//   "arg": "arg1" - optional
// }
//
// Available actions:
// - reboot - reboot the client
// - halt - power off the client
// - play_video - play specific video on client
// - reset - reset client
function parsePacket(packet) {
    if (typeof packet !== "object")
        return;

    // Simple validation: check for keys in object
    packet["arg"] = packet["arg"] || null;
    if (["node", "action", "arg"]
        .every((key) => key in packet)) {
        return packet;
    }

    console.log("Unknown packet format:", packet);
}

module.exports = { parsePacket }