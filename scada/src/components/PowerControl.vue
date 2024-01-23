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
       style="min-width: 120px">

    <div class="flex flex-row text-center">
      <span class="online-status">{{ isOnline ? "🟢" : "🔴" }}</span>
      <h3 class="text-wrap leading-none mb-2 mx-auto">{{ this.title }}</h3>
    </div>

    <div class="w-full justify-center flex gap-5">
      <i class="fa fa-power-off fa-2x" style="color: red" title="Выключить" @click="callAction('halt')"></i>
      <i class="fa fa-refresh fa-2x" style="color: green" title="Перезагрузить" @click="callAction('reboot')"></i>
      <i class="fa fa-2x"
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
  font-size: 12px;
}

h3 {
  max-width: 140px;
  font-size: 16px;
  font-weight: 600;
}

i {
  transition: all 0.2s ease-in-out;
}

i:hover {
  font-size: 38px;
}
</style>