<script setup>
defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="input-field"
  />
</template>

<style scoped>
.input-field {
  width: 100%;

  padding: 14px;

  border-radius: 8px;

  border: 1px solid #444;

  background-color: #111;

  color: white;

  box-sizing: border-box;
}
</style>
