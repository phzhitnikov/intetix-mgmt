<template>
  <div class="container mx-auto p-2 content-center h-full">
    <PowerControl
        v-for="node in nodes"

        :key="node.name"
        :name="node.name"
        :title="node.title"
        :actions="node.actions"
        :is-online="getOnline(node.name)"
        :is-selected="selectedNode === node.name"
        @click="selectedNode = node.name"
        @action="doAction"
    />
  </div>

  <Modal ref="modal"/>
</template>

<script>
import Modal from "@/components/Modal.vue";
import PowerControl from "@/components/PowerControl.vue"
import config from "@/config.js";

export default {
  components: {Modal, PowerControl},

  created() {
  },

  data() {
    return {
      nodes: config.nodes,
      selectedNode: null,
    }
  },

  computed: {
    onlineStatuses() {
      return this.$store.onlineStatuses;
    }
  },

  methods: {
    getOnline(nodeName) {
      if (nodeName === 'broadcast') {
        // If any node in system is online, show broadcast node's status as online
        return Object.values(this.onlineStatuses).some(val => val === true);
      }

      return this.onlineStatuses[nodeName] ?? false;
    },

    // System actions require confirmation through modal
    isConfirmationRequired(action) {
      return ["halt", "wakeup", "reboot", "sleep"].includes(action);
    },

    async doAction(node, title, action, argument) {
      // Execute non-system actions right away
      if (!this.isConfirmationRequired(action)) {
        this._sendAction(node, action, argument);
        return;
      }

      const actionDescription = this.$store.actionDescription[action];
      if (!actionDescription) {
        console.error("No description found for action:", action);
        return;
      }

      const ok = await this.$refs.modal.show({
        message: node === "broadcast"
            ? `${actionDescription} все объекты?`
            : `${actionDescription} объект "${title}" ?`,
        cancelMessage: "Отмена",
        confirmMessage: "Подтвердить"
      })

      if (ok) {
        this._sendAction(node, action, argument);
      }
    },

    _sendAction(node, action, argument) {
      console.log("Sending action:", node, action, argument);

      let packet = {"node": node, "action": action, "arg": argument}
      this.$socket.emit("control", packet);
    },
  }
}
</script>

<style>
</style>
