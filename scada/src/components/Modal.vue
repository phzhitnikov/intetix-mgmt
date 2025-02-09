<template>
  <div v-if="isOpen"
       tabindex="-1"
       class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm">
        <div class="p-4 text-center">
          <h3 class="mb-8 text-xl font-medium text-gray-900"> {{ message }} </h3>
          <button type="button"
                  @click="_confirm"
                  class="px-5 py-2.5 text-sm text-white font-medium bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg">
            {{ confirmMessage }}
          </button>
          <button type="button"
                  @click="_cancel"
                  class="py-2.5 px-5 ms-3 text-sm text-gray-900 font-medium bg-white focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
            {{ cancelMessage }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},

  data() {
    return {
      message: null,
      cancelMessage: "Close",
      confirmMessage: "Confirm",
      isOpen: false,

      resolvePromise: undefined,
      rejectPromise: undefined,
    }
  },

  methods: {
    show(opts = {}) {
      this.message = opts.message;
      this.cancelMessage = opts.cancelMessage ?? this.cancelMessage;
      this.confirmMessage = opts.confirmMessage ?? this.confirmMessage;

      this.isOpen = true;

      return new Promise((resolve, reject) => {
        this.resolvePromise = resolve
        this.rejectPromise = reject
      })
    },

    _confirm() {
      this.isOpen = false;
      this.resolvePromise(true);
    },

    _cancel() {
      this.isOpen = false;
      this.resolvePromise(false);
    },
  }
}
</script>