<script>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";

export default {
  components: {CollapseTransition},
  props: {
    name: String,
    title: String,
    actions: {type: Array, default: []},
    isOnline: Boolean,
    isSelected: Boolean
  },

  data() {
    return {
      systemActionsVisible: false,
      actionBtnClass: "grid grid-cols-1 flex-auto min-w-32 px-3 py-2 top-0 min-w-0 max-w-40 text-xs text-monospace text-wrap text-center justify-left text-black bg-gray-200 active:bg-gray-300 rounded-lg"
    }
  },

  methods: {
    callAction(action_name, args) {
      this.$emit("action", this.name, this.title, action_name, args);
    },
  }
}
</script>

<template>
  <div
      class="bg-white cursor-pointer opacity-80 p-2 flex flex-col columns-3 gap-1 rounded border-2 border-white my-2 shadow-2xl"
      style="min-width: 3em;"
  >
    <!-- Header -->
    <div class="flex flex-row" :class="isSelected ? 'mb-4' : ''">
      <span class="online-status mr-2">{{ isOnline ? "🟢" : "🔴" }}</span>
      <h3 class="text-wrap leading-none">{{ this.title }}</h3>
    </div>

    <!-- Actions -->
    <collapse-transition :duration="100">
      <div class="flex flex-row flex-wrap place-content-center text-center gap-4 whitespace-nowrap" v-show="isSelected">
        <button type="button"
                :class="actionBtnClass"
                @click="callAction('halt')">
          <i class="fa fa-power-off fa-2x action-icon text-red-600"></i>
          Выключить
        </button>

        <button type="button"
                :class="actionBtnClass"
                @click="callAction('wakeup')">
          <i class="fa fa-plug action-icon text-green-500"></i>
          Включить
        </button>

        <button type="button"
                :class="actionBtnClass"
                @click="callAction('reboot')">
          <i class="fa fa-undo action-icon text-orange-500"></i>
          Перезагрузить
        </button>

        <button type="button"
                :class="actionBtnClass"
                @click="callAction('sleep')">
          <i class="fa fa-moon action-icon text-blue-900"></i>
          Спящий режим
        </button>

        <button type="button"
                :class="actionBtnClass"
                :key="action.name"
                v-for="action in actions"
                @click="callAction(action.name, action.arg)">
          <i class="fa action-icon" :class="action.icon"></i>
          {{ action.help_text }}
        </button>
      </div>
    </collapse-transition>
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
  font-size: 1.5rem;
  text-align: center;

  margin-top: auto;
  margin-bottom: auto;
}

button {
  transition: all 0.1s ease-in-out;
}

button:active {
  transition: 0.1s;
}
</style>