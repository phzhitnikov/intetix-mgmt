/**
 *
 * @param {Object} packet
 * @param {...String} keys
 * @returns {Object|boolean}
 */

const {Node} = require("./client_manager");

// TODO: pass schema {node: String, action: String, arg: Object}
function parsePacket(packet, ...keys) {
    if (typeof packet !== "object")
        return false;

    // arg is optional
    packet["arg"] = packet["arg"] ?? null;

    let isValid = keys.every((key) => key in packet);
    if (!isValid) {
        console.log("Invalid packet:", packet);
        return false;
    }

    // Insert node object
    if ('node' in packet) {
        let nodeName = packet['node'];
        packet['node'] = new Node(nodeName);
    }

    return packet;
}

module.exports = { parsePacket }