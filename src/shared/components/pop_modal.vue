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
  background-color: rgba(0, 0, 0, 0.7); /* Slightly darker for better contrast */
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* THE FIX: Forces the modal to be the absolute top layer */
  z-index: 9999; 
}

.modal-box {
  background-color: #1a1a1a;
  padding: 30px;
  border-radius: 10px;
  min-width: 350px;
  color: white;
  position: relative;
  /* Add a subtle shadow to make it pop out more */
  box-shadow: 0 10px 30px rgba(0,0,0,0.5); 
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #aaa;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #e63946; /* Turns red when hovering */
}
</style>