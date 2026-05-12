<script setup>
defineProps({
  text: String,
  type: {
    type: String,
    default: 'button',
  },
})
</script>

<template>
  <button :type="type" class="primary-button">
    {{ text }}
  </button>
</template>

<style scoped>
.primary-button {
  background-color: #f0c400;

  border: none;

  padding: 14px 20px;

  border-radius: 8px;

  font-weight: bold;

  cursor: pointer;

  width: 100%;
}
</style>
