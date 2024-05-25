class Node {
    constructor(rawName) {
        let parsed = parseNodeName(rawName)

        this.name = parsed.name;
        this.group = parsed.group
    }

    get fullName() {
        if (this.name === this.group)
            return `${this.group}`
        else
            return `${this.name}@${this.group}`
    }
}

class ClientManager {
    constructor(io, scadaNode) {
        this.io = io;
        this.scadaNode = scadaNode;
        this.nodesOnline = {};  // socket_id -> Node() mapping
    }

    /**
     * @returns {Node[]}
     */
    get all_clients() {
        return Object.values(this.nodesOnline);
    }

    get clients() {
        return this.all_clients.filter(n => n.name !== this.scadaNode);
    }

    add(socket_id, nodeName) {
        let node = new Node(nodeName);
        this.nodesOnline[socket_id] = node;

        // Tell the scada to update node's online status
        this._updateOnlineStatus(node.fullName, true);

        return node;
    }

    remove(socket_id) {
        let node = this.get(socket_id);
        if (!node) return;

        console.log(`[${node.fullName}]`, "Node disconnected");

        // Tell the scada to update node's online status
        if (node.name !== this.scadaNode)
            this._updateOnlineStatus(node.fullName, false);

        delete this.nodesOnline[socket_id];
    }

    informScada() {
        // First, clear online mapping in scada node
        this._clearOnlineStatuses();

        // Then, end all connected node names to scada
        this.clients.forEach(node => this._updateOnlineStatus(node.fullName, true));
    }

    /**
     * @param socket_id
     * @returns {Node}
     */
    get(socket_id) {
        return this.nodesOnline[socket_id];
    }

    _updateOnlineStatus(nodeName, isOnline) {
        this.io.to(this.scadaNode).emit("online", nodeName, isOnline);
    }

    _clearOnlineStatuses() {
        this.io.to(this.scadaNode).emit("clear_online");
    }
}

/**
 * Parse node name into separate components: name and group.
 * E.g.: test@admin -> node 'test' + group 'admin'
 * @param name
 * @returns {{name, group}|{name: String, group: String}}
 */
function parseNodeName(name) {
    let splitted = name.split('@');
    if (splitted.length === 1)
        return {name: name, group: name};
    else
        return {name: splitted[0], group: splitted[1]};
}

module.exports = {ClientManager, Node}