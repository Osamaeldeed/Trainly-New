<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm"
      @click.self="cancel"
    >
      <Transition name="modal-content">
        <div
          v-if="isOpen"
          class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform"
        >
          <!-- Icon -->
          <div class="flex justify-center mb-4">
            <div class="bg-red-100 rounded-full p-3">
              <svg
                class="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-2xl font-bold text-gray-800 text-center mb-2">
            Log Out
          </h3>

          <!-- Message -->
          <p class="text-gray-600 text-center mb-6">
            Are you sure you want to log out?
          </p>

          <!-- Buttons -->
          <div class="flex gap-3">
            <button
              @click="cancel"
              class="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            >
              Cancel
            </button>
            <button
              @click="confirm"
              class="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "ConfirmLogoutModal",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "confirm", "cancel"],
  setup(props, { emit }) {
    const isOpen = ref(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        isOpen.value = newValue;
      }
    );

    const confirm = () => {
      emit("confirm");
      closeModal();
    };

    const cancel = () => {
      emit("cancel");
      closeModal();
    };

    const closeModal = () => {
      isOpen.value = false;
      emit("update:modelValue", false);
    };

    return {
      isOpen,
      confirm,
      cancel,
    };
  },
};
</script>

<style scoped>
/* Modal Overlay Animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Modal Content Animation */
.modal-content-enter-active {
  transition: all 0.3s ease;
}

.modal-content-leave-active {
  transition: all 0.2s ease;
}

.modal-content-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(-20px);
}

.modal-content-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
