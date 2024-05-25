module.exports = {
    scadaNode: "scada",
    port: "8082",

    // Mapping "node name -> MAC address"
    macs: {
        "node1": "",
    },

    // Broadcast address can be calculated with this tool: http://jodies.de/ipcalc
    lanBroadcastAddress: "192.168.0.255",
}