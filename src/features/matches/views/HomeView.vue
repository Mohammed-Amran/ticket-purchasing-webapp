<script setup>
import MainLayout from '../../../app/layouts/MainLayout.vue'

import MatchCard from '../../../shared/components/match_card.vue'
import PrimaryButton from '../../../shared/components/primary_button.vue'

import NavBar from '../../../shared/components/Navigation_bar.vue'
import popUpWindow from '../../../shared/components/pop_modal.vue'
import FooterSection from '../../../shared/components/footer_section.vue'

const matches = [
  {
    id: 1,
    title: 'FC Barcelona vs Bayern Munich',
    date: '26 October 2026',
    time: '20:00',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
  },

  {
    id: 2,
    title: 'FC Barcelona vs Real Madrid',
    date: '2 November 2026',
    time: '21:00',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377',
  },

  {
    id: 3,
    title: 'FC Barcelona vs Manchester City',
    date: '18 November 2026',
    time: '19:30',
    image: 'https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a',
  },
]
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

        <div class="matches-grid">
          <MatchCard
            v-for="match in matches"
            :key="match.id"
            :title="match.title"
            :date="match.date"
            :time="match.time"
            :image="match.image"
          />
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
.home-page {
  background-color: #0f0f0f;

  min-height: 100vh;

  color: white;
}

.hero-section {
  height: 90vh;

  background-image: url('https://images.unsplash.com/photo-1577223625816-7546f13df25d');

  background-size: cover;

  background-position: center;

  position: relative;
}

.overlay {
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.6);

  display: flex;

  flex-direction: column;

  justify-content: center;

  padding-left: 80px;
}

.overlay h1 {
  font-size: 64px;

  max-width: 700px;

  margin-bottom: 20px;
}

.overlay p {
  font-size: 20px;

  color: #ddd;

  margin-bottom: 30px;
}

.hero-button {
  width: 220px;
}

.matches-section {
  padding: 60px 80px;
}

.section-header {
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 36px;
}

.matches-grid {
  display: flex;

  gap: 30px;

  flex-wrap: wrap;
}

.membership-section {
  margin-top: 60px;

  background-color: #181818;

  padding: 80px;
}

.membership-content {
  max-width: 700px;
}

.membership-content h2 {
  font-size: 42px;

  margin-bottom: 20px;
}

.membership-content p {
  color: #bbb;

  margin-bottom: 30px;

  font-size: 18px;
}

.membership-button {
  width: 220px;
}
</style>
