<script setup>
defineProps({
  show: Boolean,
})

defineEmits(['close'])
</script>

<template>
  <div v-if="show" class="overlay">
    <div class="modal-box">
      <button class="close-btn" @click="$emit('close')">X</button>

      <slot />
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;

  justify-content: center;
  align-items: center;
}

.modal-box {
  background-color: #1a1a1a;

  padding: 30px;

  border-radius: 10px;

  min-width: 350px;

  color: white;

  position: relative;
}

.close-btn {
  position: absolute;

  top: 10px;
  right: 10px;

  background: none;

  border: none;

  color: white;

  cursor: pointer;
}
</style>
