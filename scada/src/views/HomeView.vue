<template>
      <PowerControl
          v-for="node in nodes"

          :name="node.name"
          :title="node.title"
          :actions="node.actions"
          :style="{left: node.position.x, top: node.position.y}"
          :is-online="getOnline(node.name)"
          @action="onControlAction"
      />
</template>

<script>
import PowerControl from "@/components/PowerControl.vue"
import config from "@/config.js";

export default {
  components: {PowerControl},

  created() {
  },

  data() {
    return {
      nodes: config.nodes,
    }
  },

  computed: {
    onlineStatuses() { return this.$store.onlineStatuses; }
  },

  methods: {
    getOnline(nodeName) {
      if (nodeName === 'broadcast') {
        // If any node in system is online, show broadcast node's status as online
        return Object.values(this.onlineStatuses).some(val => val === true);
      }

      return this.onlineStatuses[nodeName] ?? false;
    },

    onControlAction(node, action, argument) {
      console.log("Sending action:", node, action, argument);

      let packet = {"node": node, "action": action, "arg": argument}
      this.$socket.emit("control", packet);
    }
  }
}
</script>

<style>
</style>
