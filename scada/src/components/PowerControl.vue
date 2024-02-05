<script>
export default {
  props: {
    name: String,
    title: String,
    actions: Array,
    isOnline: Boolean
  },

  methods: {
    callAction(action_name, args) {
      this.$emit("action", this.name, action_name, args);
    },
  }
}
</script>

<template>
  <div class="absolute bg-white opacity-80 p-1 flex flex-col gap-1 rounded border-2 border-white shadow-2xl"
       style="min-width: 3em;">

    <div class="flex flex-row text-center">
      <span class="online-status mr-2">{{ isOnline ? "🟢" : "🔴" }}</span>
      <h3 class="text-wrap leading-none mb-2 mx-auto">{{ this.title }}</h3>
    </div>

    <div class="w-full justify-center flex gap-3">
      <i class="fa fa-power-off fa-2x action-icon" style="color: red" title="Выключить" @click="callAction('halt')"></i>
      <i class="fa fa-refresh fa-2x action-icon" style="color: green" title="Перезагрузить" @click="callAction('reboot')"></i>
      <i class="fa fa-2x action-icon"
         v-for="action in actions"
         :class="action.icon"
         :title="action.help_text"
         @click="callAction(action.name, action.arg)"
      >
      </i>
    </div>
  </div>
</template>

<style scoped>
.online-status {
  font-size: 0.5em;
}

h3 {
  max-width: 140px;
  font-size: 1rem;
  font-weight: 600;
}

.action-icon {
  transition: all 0.2s ease-in-out;
  font-size: 1.5rem;
}

.action-icon:hover {
  font-size: 2rem;
}
</style>