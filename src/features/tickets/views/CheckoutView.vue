<script setup>
import MainLayout from '../../../app/layouts/MainLayout.vue'
import PrimaryButton from '../../../shared/components/primary_button.vue'
import NavBar from '../../../shared/components/Navigation_bar.vue'
import FooterSection from '../../../shared/components/footer_section.vue'
import PopModal from '../../../shared/components/pop_modal.vue'

import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTicketStore } from '../stores/tickerStore'

const route = useRoute()
const router = useRouter()
const ticketStore = useTicketStore()

// Get user from localStorage (saved during Google Login)
const user = ref(JSON.parse(localStorage.getItem('user')))

const showPaymentModal = ref(false)
const showCartSuccessModal = ref(false)
const cardNumber = ref('')

// Compute the first available ticket to show
const currentTicket = computed(() => {
  return ticketStore.availableTickets.length > 0 ? ticketStore.availableTickets[0] : null
})

onMounted(() => {
  if (!user.value) {
    alert("Please login first!")
    router.push('/')
    return
  }
  const matchId = route.query.matchId
  if (matchId) {
    ticketStore.fetchMatchDetails(matchId)
  }
})

const handleAddToCart = async () => {
  if (currentTicket.value) {
    try {
      // Calling the store action directly instead of just emitting to test the modal flow
      await ticketStore.addToCart(user.value.uid, currentTicket.value.ticketId)
      showCartSuccessModal.value = true
    } catch (error) {
       // Handled in store, but we can catch it here if we want specific UI behavior
       console.error("Cart addition failed:", error);
    }
  }
}

const handlePurchaseClick = () => {
  showPaymentModal.value = true
}

const submitPayment = async () => {
  if (cardNumber.value.length < 16) {
    alert("Please enter a valid simulated 16-digit card number.")
    return
  }
  
  if (currentTicket.value) {
    const success = await ticketStore.processCheckout(
      user.value.uid, 
      currentTicket.value.ticketId, 
      user.value.email
    )
    
    if (success) {
      showPaymentModal.value = false
      alert("Payment Successful! Ticket sent to " + user.value.email)
      router.push('/home') // Send back to home after purchase
    }
  }
}
</script>

<template>
  <MainLayout>
    <NavBar />

    <div class="checkout-page">
      <p v-if="ticketStore.loading">Loading match details...</p>
      <p v-else-if="!ticketStore.currentMatch">No match found.</p>

      <div v-else class="ticket-container">
        <div class="left-section">
          <div class="ticket-header">
            <h1>FC Barcelona vs {{ ticketStore.currentMatch.opponentTeam }}</h1>
            <p>Official Match Ticket</p>
          </div>

          <div class="ticket-details" v-if="currentTicket">
            <div class="detail-box">
              <span class="label">Date</span>
              <span class="value">{{ ticketStore.currentMatch.date }}</span>
            </div>
            <div class="detail-box">
              <span class="label">Kickoff Time</span>
              <span class="value">{{ ticketStore.currentMatch.time }}</span>
            </div>
            <div class="detail-box">
              <span class="label">Stadium</span>
              <span class="value">{{ ticketStore.currentMatch.stadium }}</span>
            </div>
            <div class="detail-box">
              <span class="label">Gate</span>
              <span class="value">Gate {{ currentTicket.gateNo }}</span>
            </div>
            <div class="detail-box">
              <span class="label">Section</span>
              <span class="value">Section {{ currentTicket.sectionNo }}</span>
            </div>
            <div class="detail-box">
              <span class="label">Seat</span>
              <span class="value">Row {{ currentTicket.rowNo }} - Seat {{ currentTicket.seatNo }}</span>
            </div>
            <div class="detail-box" style="grid-column: span 2; background-color: #00a3e020; border: 1px solid #00a3e0;">
              <span class="label" style="color: #00a3e0;">Price</span>
              <span class="value" style="color: #00a3e0; font-size: 24px;">${{ currentTicket.price }}</span>
            </div>
          </div>
          <p v-else style="color: #e63946; margin-top: 20px;">Tickets Sold Out for this match.</p>
        </div>

        <div class="right-section">
          <div class="qr-box">
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=FCBARCELONA_SECURE_TICKET"
              alt="QR Code"
            />
          </div>

          <div class="user-details">
            <h2>{{ user ? user.name : 'Guest' }}</h2>
            <p>{{ user ? user.email : '' }}</p>
          </div>

          <div class="button-section" v-if="currentTicket">
            <div @click="handleAddToCart"><PrimaryButton text="ADD TO CART" /></div>
            <div @click="handlePurchaseClick"><PrimaryButton text="PURCHASE" /></div>
          </div>
        </div>
      </div>
    </div>

    <PopModal :show="showCartSuccessModal" @close="showCartSuccessModal = false">
      <div style="text-align: center;">
        <h2 style="color: #00a3e0; margin-bottom: 15px;">Success!</h2>
        <p>The ticket has been added to your cart.</p>
        <button class="pay-btn" style="margin-top: 20px; width: 100%;" @click="showCartSuccessModal = false">Continue Browsing</button>
      </div>
    </PopModal>

    <div v-if="showPaymentModal" class="modal-overlay">
      <div class="modal-content">
        <h2>Simulated Payment</h2>
        <p>Total: ${{ currentTicket?.price }}</p>
        <input 
          v-model="cardNumber" 
          type="text" 
          placeholder="Enter 16-digit Card Number" 
          maxlength="16"
          class="card-input"
        />
        <div class="modal-actions">
          <button class="cancel-btn" @click="showPaymentModal = false">Cancel</button>
          <button class="pay-btn" @click="submitPayment">Pay Now</button>
        </div>
      </div>
    </div>

    <FooterSection />
  </MainLayout>
</template>

<style scoped>
/* Keeping your original styling structure */
.checkout-page { min-height: calc(100vh - 200px); background-color: #0f0f0f; padding: 60px; color: white; }
.ticket-container { background-color: #181818; border-radius: 20px; display: flex; overflow: hidden; min-height: 650px; border: 1px solid #333; }
.left-section { flex: 2; padding: 50px; border-right: 1px solid #333; }
.ticket-header h1 { font-size: 42px; margin-bottom: 10px; }
.ticket-header p { color: #aaa; margin-bottom: 50px; }
.ticket-details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; }
.detail-box { background-color: #222; padding: 20px; border-radius: 12px; display: flex; flex-direction: column; gap: 10px; }
.label { color: #999; font-size: 14px; }
.value { font-size: 18px; font-weight: bold; }
.right-section { flex: 1; padding: 50px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; }
.qr-box { background-color: white; padding: 15px; border-radius: 12px; }
.user-details { text-align: center; }
.user-details h2 { margin-bottom: 10px; }
.user-details p { color: #aaa; }
.button-section { width: 100%; display: flex; flex-direction: column; gap: 20px; }

/* Modal Styling */
.modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000;
}
.modal-content {
  background: #181818; padding: 40px; border-radius: 15px; text-align: center; border: 1px solid #00a3e0; width: 400px;
}
.modal-content h2 { color: white; margin-bottom: 10px; }
.modal-content p { color: #aaa; margin-bottom: 20px; }
.card-input {
  width: 100%; padding: 15px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #444; background: #222; color: white; font-size: 16px;
}
.modal-actions { display: flex; justify-content: space-between; gap: 15px; }
.cancel-btn { background: transparent; color: white; border: 1px solid #444; padding: 12px 20px; border-radius: 8px; cursor: pointer; flex: 1; }
.pay-btn { background: linear-gradient(135deg, #00a3e0 0%, #e63946 100%); color: white; border: none; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; flex: 1; }
</style>