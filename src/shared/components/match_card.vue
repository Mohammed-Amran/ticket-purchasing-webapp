<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  date: String,
  time: String,
  image: String,
  competition: String, // New prop from DB
})

// Dynamically select the logo based on competition name
const competitionLogo = computed(() => {

  const comp = props.competition?.toLowerCase() || ''
  
  if (comp.includes('la liga')) {
                                
                                return new URL('../utils/images/laliga.png', import.meta.url).href
                               
                              } else if (comp.includes('copa del rey')) {

                                                                         return new URL('../utils/images/copa-del-rey.png', import.meta.url).href
  
                                                                        } else if (comp.includes('champions league')) {
   
                                                                                                                        return new URL('../utils/images/champions.svg', import.meta.url).href
                                                                            
                                                                                                                      }
  
  // Fallback if none match
  return null
})
</script>

<template>
  <div class="match-card">
    <div class="image-container">
      <img :src="image" alt="match" class="main-image" />
      <div v-if="competitionLogo" class="comp-badge">
        <img :src="competitionLogo" alt="competition logo" />
      </div>
    </div>

    <div class="card-content">
      <p class="comp-text">{{ competition }}</p>
      <h2>{{ title }}</h2>
      <div class="time-info">
        <span>{{ date }}</span>
        <span class="separator">|</span>
        <span>{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.match-card {
  width: 300px;
  background-color: #1a1a1a;
  border-radius: 12px;
  overflow: hidden;
  color: white;
  border: 1px solid #333;
}

.image-container {
  position: relative;
  height: 180px;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comp-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  padding: 5px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
}

.comp-badge img {
  height: 30px;
  width: auto;
  object-fit: contain;
}

.card-content {
  padding: 15px;
}

.comp-text {
  margin: 0;
  font-size: 12px;
  text-transform: uppercase;
  color: #00a3e0;
  font-weight: bold;
  letter-spacing: 1px;
}

h2 {
  margin: 10px 0;
  font-size: 18px;
}

.time-info {
  font-size: 14px;
  color: #aaa;
  display: flex;
  gap: 8px;
}

.separator {
  color: #444;
}
</style>