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
          <div class="hero-button">
            <PrimaryButton text="GET TICKETS" />
          </div>
        </div>
      </section>

      <section class="matches-section">
        <div class="section-header">
          <h2>Upcoming Matches</h2>
        </div>

        <p v-if="matchStore.loading">Loading matches...</p>
        <p v-else-if="matchStore.error" class="error">{{ matchStore.error }}</p>

        <div v-else class="matches-grid">
          <div 
            v-for="match in matchStore.matches" 
            :key="match.match_id" 
            @click="goToCheckout(match.match_id)"
            style="cursor: pointer;"
          >
            <MatchCard
              :title="'FC Barcelona vs ' + match.opponentTeam"
              :date="match.date"
              :time="match.time"
              image="https://san-i.co.il/wp-content/uploads/2025/11/Camp-Nou-Renovates-San-Interactive--1024x768.jpg"
            />
          </div>
        </div>
      </section>

      <section class="membership-section">
        <div class="membership-content">
          <h2>Become a Barça Member</h2>
          <p>Get early ticket access, VIP benefits and exclusive experiences.</p>
          <div class="membership-button">
            <PrimaryButton text="JOIN NOW" />
          </div>
        </div>
      </section>
      <FooterSection />
    </div>
  </MainLayout>
</template>

<style scoped>
/* Keep all your original CSS exactly as it was! */
.home-page { background-color: #0f0f0f; min-height: 100vh; color: white; }
.hero-section { height: 90vh; background-image: url('https://images.unsplash.com/photo-1577223625816-7546f13df25d'); background-size: cover; background-position: center; position: relative; }
.overlay { width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); display: flex; flex-direction: column; justify-content: center; padding-left: 80px; }
.overlay h1 { font-size: 64px; max-width: 700px; margin-bottom: 20px; }
.overlay p { font-size: 20px; color: #ddd; margin-bottom: 30px; }
.hero-button { width: 220px; }
.matches-section { padding: 60px 80px; }
.section-header { margin-bottom: 40px; }
.section-header h2 { font-size: 36px; }
.matches-grid { display: flex; gap: 30px; flex-wrap: wrap; }
.membership-section { margin-top: 60px; background-color: #181818; padding: 80px; }
.membership-content { max-width: 700px; }
.membership-content h2 { font-size: 42px; margin-bottom: 20px; }
.membership-content p { color: #bbb; margin-bottom: 30px; font-size: 18px; }
.membership-button { width: 220px; }
.error { color: #e63946; }
</style>