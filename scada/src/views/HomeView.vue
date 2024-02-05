<template>
      <PowerControl
          v-for="node in nodes"

          :name="node.name"
          :title="node.title"
          :actions="node.actions"
          :style="{left: node.position.x, top: node.position.y}"
          :is-online="onlineStatuses[node.name] ?? false"
          @action="onControlAction"
      />
</template>

<script>
import PowerControl from "@/components/PowerControl.vue"
import {io} from "socket.io-client";
import config from "@/config.js";

export default {
  components: {PowerControl},

  created() {
    // Connect to server
    this.socket = io(config.serverUrl, {transports: ["websocket"]});
    this.socket.on("connect", () => {
      console.log("Connected to server");

      // Present yourself to server
      this.socket.emit('join', config.node);
    });

    // Handle node connect/disconnect events
    this.socket.on("online", (nodeName, value, clear) => {
      console.log("Got online update:", nodeName, value);

      // Special option to clear all online statuses first
      if (clear)
        this.onlineStatuses = {};

      this.onlineStatuses[nodeName] = value;
    })
  },

  data() {
    return {
      nodes: config.nodes,
      onlineStatuses: {},
    }
  },

  methods: {
    onControlAction(node, action, argument) {
      console.log("Sending action:", node, action, argument);

      let packet = {"node": node, "action": action, "arg": argument}
      this.socket.emit("control", packet);
    }
  }
}
</script>

<style>
</style>
