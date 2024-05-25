<script>
export default {
  props: {
    name: String,
    title: String,
    actions: {type: Array, default: []},
    isOnline: Boolean
  },

  data() {
    return {
      systemActionsVisible: false
    }
  },

  methods: {
    callAction(action_name, args) {
      this.$emit("action", this.name, action_name, args);
    },

    toggleActionsBar() {
      this.systemActionsVisible = !this.systemActionsVisible;
    }
  }


}
</script>

<template>
  <div class="absolute bg-white opacity-80 p-2 flex flex-col gap-1 rounded border-2 border-white shadow-2xl"
       style="min-width: 3em;"
  >

    <!-- Header -->
    <div class="flex flex-row text-center select-none" @click="toggleActionsBar()">
      <span class="online-status mr-2">{{ isOnline ? "🟢" : "🔴" }}</span>
      <h3 class="text-wrap leading-none mb-2 mx-auto">{{ this.title }}</h3>
    </div>

    <!-- System actions -->
    <div class="w-full justify-center flex gap-4" v-show="systemActionsVisible">
      <i class="fa fa-moon fa-2x action-icon" style="color: #1E3050"
         title="Сон"
         @click="callAction('sleep')"></i>
      <i class="fa fa-lightbulb-o fa-2x action-icon"
         title="Пробуждение"
         @click="callAction('wakeup')"></i>
      <i class="fa fa-power-off fa-2x action-icon" style="color: red"
         title="Выключить"
         @click="callAction('halt')"></i>
      <i class="fa fa-refresh fa-2x action-icon" style="color: green"
         title="Перезагрузить"
         @click="callAction('reboot')"></i>
    </div>

    <!-- Content actions -->
    <div class="w-full justify-center flex gap-4" v-show="!systemActionsVisible">
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
  font-size: 10px;
}

h3 {
  max-width: 140px;
  font-size: 1rem;
  font-weight: 600;
}

.action-icon {
  background-color: transparent;
  transition: all 0.1s ease-in-out;
  font-size: 1.5rem;
  text-align: center;
}

@media (hover: hover) {
  .action-icon:hover {
    font-size: 2rem;
    transition: 0.1s;
  }
}

.action-icon:active {
  background-color: gray;
  transition: 0.1s;
}
</style>