<script setup>
import MainLayout from '../../../app/layouts/MainLayout.vue'
import MatchCard from '../../../shared/components/match_card.vue'
import PrimaryButton from '../../../shared/components/primary_button.vue'
import NavBar from '../../../shared/components/Navigation_bar.vue'
import FooterSection from '../../../shared/components/footer_section.vue'

import { onMounted } from 'vue'
import { useMatchStore } from '../stores/matchStore'
import { useRouter } from 'vue-router'

const matchStore = useMatchStore()
const router = useRouter()

const goToCheckout = (matchId) => {
  router.push({ name: 'checkout', query: { matchId: matchId } })
}

// Smooth scroll function
const scrollToTickets = () => {
  const ticketsSection = document.getElementById('tickets-section')
  if (ticketsSection) {
    ticketsSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  matchStore.fetchMatches()
})
</script>

<template>
  <MainLayout>
    <div class="home-page">
      <NavBar />
      <section class="hero-section">
        <div class="overlay">
          <h1>LIVE THE MATCHDAY EXPERIENCE</h1>
          <p>Buy official FC Barcelona tickets securely and instantly.</p>
          <div class="hero-button" @click="scrollToTickets" style="cursor: pointer;">
            <PrimaryButton text="GET TICKETS" />
          </div>
        </div>
      </section>

      <section id="tickets-section" class="matches-section">
        <div class="section-header">
          <h2>Available Tickets</h2>
        </div>

        <p v-if="matchStore.loading">Loading matches...</p>
        <p v-else-if="matchStore.error" class="error">{{ matchStore.error }}</p>

        <div v-else class="matches-grid">
          <div 
            v-for="match in matchStore.matches" 
            :key="match.match_id" 
            @click="goToCheckout(match.match_id)"
            class="ticket-card-wrapper"
          >
            <MatchCard
              :title="'FC Barcelona vs ' + match.opponentTeam"
              :date="match.date"
              :time="match.time"
              image="https://marcaenzona.com/news/uploads/images/image_750x415_67054c877da71.jpg"
            />
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  </MainLayout>
</template>

<style scoped>
/* Original CSS */
.home-page { background-color: #0f0f0f; min-height: 100vh; color: white; }
.hero-section { height: 90vh; background-image: url('../../../shared/utils/images/Hero.jpg'); background-size: cover; background-position: center; position: relative; }
.overlay { width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; flex-direction: column; justify-content: center; padding-left: 80px; }
.overlay h1 { font-size: 64px; max-width: 700px; margin-bottom: 20px; }
.overlay p { font-size: 20px; color: #ddd; margin-bottom: 30px; }
.hero-button { width: 220px; }
.matches-section { padding: 60px 80px; }
.section-header { margin-bottom: 40px; }
.section-header h2 { font-size: 36px; }
.matches-grid { display: flex; gap: 40px; flex-wrap: wrap; }
.error { color: #e63946; }

/* --- NEW TICKET CARD HOVER EFFECTS --- */
.ticket-card-wrapper {
  cursor: pointer;
  border-radius: 12px; /* Smooths the corners of the shadow */
  transition: all 0.3s ease;
  /* Adding a subtle base shadow so the transition feels natural */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); 
}

.ticket-card-wrapper:hover {
  /* Lifts the card up slightly and scales it */
  transform: translateY(-8px) scale(1.02);
  /* The Magic Glow: Blue shadow pulled left, Red shadow pulled right */
  box-shadow: -10px 10px 25px rgba(0, 77, 152, 0.6), 10px 10px 25px rgba(219, 0, 48, 0.6);
}
</style>