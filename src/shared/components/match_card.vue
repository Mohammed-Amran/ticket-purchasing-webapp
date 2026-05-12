<script setup>
defineProps({
  title: String,
  date: String,
  time: String,
  image: String,
})
</script>

<template>
  <div class="match-card">
    <img :src="image" alt="match" />

    <h2>{{ title }}</h2>

    <p>{{ date }}</p>

    <p>{{ time }}</p>
  </div>
</template>

<style scoped>
.match-card {
  width: 300px;

  background-color: #1a1a1a;

  border-radius: 10px;

  overflow: hidden;

  color: white;
}

img {
  width: 100%;

  height: 180px;

  object-fit: cover;
}

h2,
p {
  padding-left: 15px;
}
</style>
