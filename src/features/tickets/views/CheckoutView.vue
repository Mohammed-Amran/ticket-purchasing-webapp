<script setup>
import MainLayout from '../../../app/layouts/MainLayout.vue'

import PrimaryButton from '../../../shared/components/primary_button.vue'
</script>

<template>
  <MainLayout>
    <div class="checkout-page">
      <div class="ticket-container">
        <div class="left-section">
          <div class="ticket-header">
            <h1>FC Barcelona vs Bayern Munich</h1>

            <p>UEFA Champions League</p>
          </div>

          <div class="ticket-details">
            <div class="detail-box">
              <span class="label">Date</span>

              <span class="value">26 October 2026</span>
            </div>

            <div class="detail-box">
              <span class="label">Kickoff Time</span>

              <span class="value">20:00</span>
            </div>

            <div class="detail-box">
              <span class="label">Stadium</span>

              <span class="value">Spotify Camp Nou</span>
            </div>

            <div class="detail-box">
              <span class="label">Gate</span>

              <span class="value">Gate B</span>
            </div>

            <div class="detail-box">
              <span class="label">Section</span>

              <span class="value">Section 104</span>
            </div>

            <div class="detail-box">
              <span class="label">Seat</span>

              <span class="value">Row 12 - Seat 18</span>
            </div>

            <div class="detail-box">
              <span class="label">Price</span>

              <span class="value">€120</span>
            </div>
          </div>
        </div>

        <div class="right-section">
          <div class="qr-box">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=FCBARCELONA"
              alt="QR Code"
            />
          </div>

          <div class="user-details">
            <h2>Mohammed Amran</h2>

            <p>Official Match Ticket</p>
          </div>

          <div class="button-section">
            <PrimaryButton text="ADD TO CART" />

            <PrimaryButton text="PURCHASE" />
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.checkout-page {
  min-height: 100vh;

  background-color: #0f0f0f;

  padding: 60px;

  color: white;
}

.ticket-container {
  background-color: #181818;

  border-radius: 20px;

  display: flex;

  overflow: hidden;

  min-height: 650px;
}

.left-section {
  flex: 2;

  padding: 50px;

  border-right: 1px solid #333;
}

.ticket-header h1 {
  font-size: 42px;

  margin-bottom: 10px;
}

.ticket-header p {
  color: #aaa;

  margin-bottom: 50px;
}

.ticket-details {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 25px;
}

.detail-box {
  background-color: #222;

  padding: 20px;

  border-radius: 12px;

  display: flex;

  flex-direction: column;

  gap: 10px;
}

.label {
  color: #999;

  font-size: 14px;
}

.value {
  font-size: 18px;

  font-weight: bold;
}

.right-section {
  flex: 1;

  padding: 50px;

  display: flex;

  flex-direction: column;

  justify-content: space-between;

  align-items: center;
}

.qr-box {
  background-color: white;

  padding: 15px;

  border-radius: 12px;
}

.user-details {
  text-align: center;
}

.user-details h2 {
  margin-bottom: 10px;
}

.user-details p {
  color: #aaa;
}

.button-section {
  width: 100%;

  display: flex;

  flex-direction: column;

  gap: 20px;
}
</style>
