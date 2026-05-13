<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import PopModal from './pop_modal.vue'
import apiClient from '../services/apiClient'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user')))

const showCartModal = ref(false)
const showOrdersModal = ref(false)
const loading = ref(false)

const cartItems = ref([])
const orders = ref([])
// NEW: Track cart count separately for the badge
const cartCount = ref(0) 

const goHome = () => {
  router.push('/home')
}

// NEW: Function to silently fetch just the count for the badge
const fetchCartCount = async () => {
  if (user.value) {
    try {
      const response = await apiClient.get(`/cart/${user.value.uid}`)
      cartCount.value = response.data.length
    } catch (error) {
      console.error("Could not fetch cart count:", error)
    }
  }
}

// Run when the navbar loads
onMounted(() => {
  fetchCartCount()
  // Listen for the custom event we added to CheckoutView
  window.addEventListener('cart-updated', fetchCartCount)
})

// Clean up the listener if the navbar is destroyed
onUnmounted(() => {
  window.removeEventListener('cart-updated', fetchCartCount)
})

const openCart = async () => {
  if (!user.value) {
    alert("Please login first!")
    return
  }
  showCartModal.value = true
  loading.value = true
  try {
    const response = await apiClient.get(`/cart/${user.value.uid}`)
    cartItems.value = response.data
    cartCount.value = response.data.length // Update badge when opened
  } catch (error) {
    console.error("Failed to load cart:", error)
  } finally {
    loading.value = false
  }
}

const openOrders = async () => {
  if (!user.value) {
    alert("Please login first!")
    return
  }
  showOrdersModal.value = true
  loading.value = true
  try {
    const response = await apiClient.get(`/users/${user.value.uid}/tickets`)
    orders.value = response.data
  } catch (error) {
    console.error("Failed to load orders:", error)
  } finally {
    loading.value = false
  }
}

const goToCheckoutFromCart = (matchId) => {
  showCartModal.value = false
  router.push({ name: 'checkout', query: { matchId: matchId } })
}
</script>

<template>
  <nav class="navbar">
    <h1 class="logo-text" @click="goHome">FC BARCELONA</h1>

    <div class="links">
      <button class="icon-btn" @click="openOrders" title="My Purchased Tickets">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </button>

      <div class="cart-wrapper">
        <button class="icon-btn" @click="openCart" title="My Cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </button>
        <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
      </div>
    </div>
  </nav>

  <PopModal :show="showCartModal" @close="showCartModal = false">
    <h2 class="modal-title">My Cart</h2>
    <div v-if="loading" class="state-msg">Loading cart...</div>
    <div v-else-if="cartItems.length === 0" class="state-msg">Your cart is completely empty.</div>
    <div v-else class="modal-list">
      <div v-for="item in cartItems" :key="item.cart_id" class="modal-item cart-item" @click="goToCheckoutFromCart(item.matchId)">
        <div class="item-info">
          <h3>vs {{ item.opponentTeam }}</h3>
          <p>{{ item.date }}</p>
          <span class="seat-badge">Gate {{ item.gateNo }} | Sec {{ item.sectionNo }} | Seat {{ item.seatNo }}</span>
        </div>
        <div class="item-action">
          <span class="price">${{ item.price }}</span>
          <span class="checkout-hint">Checkout ➔</span>
        </div>
      </div>
    </div>
  </PopModal>

  <PopModal :show="showOrdersModal" @close="showOrdersModal = false">
    <h2 class="modal-title">My Purchased Tickets</h2>
    <div v-if="loading" class="state-msg">Loading tickets...</div>
    <div v-else-if="orders.length === 0" class="state-msg">You haven't purchased any tickets yet.</div>
    <div v-else class="modal-list">
      <div v-for="order in orders" :key="order.paymentId" class="modal-item order-item">
        <div class="item-info">
          <h3>vs {{ order.opponentTeam }}</h3>
          <p>{{ order.matchDate }}</p>
          <span class="seat-badge">Gate {{ order.gateNo }} | Sec {{ order.sectionNo }} | Seat {{ order.seatNo }}</span>
          <p class="ref-text">Ref: {{ order.transaction_reference }}</p>
        </div>
        <div class="item-status">
          <span class="paid-badge">PAID</span>
        </div>
      </div>
    </div>
  </PopModal>
</template>

<style scoped>
.navbar { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; background-color: #050505; border-bottom: 1px solid #222; position: sticky; top: 0; z-index: 1000; }
.logo-text { margin: 0; font-size: 32px; font-weight: 800; cursor: pointer; background: linear-gradient(135deg, #004d98 0%, #db0030 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; transition: opacity 0.2s; }
.logo-text:hover { opacity: 0.8; }
.links { display: flex; gap: 25px; align-items: center; }

/* NEW WRAPPER AND BADGE FOR CART */
.cart-wrapper {
  position: relative; /* Anchor point for the absolute badge */
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #e63946; /* Bold red to grab attention */
  color: white;
  font-size: 12px;
  font-weight: bold;
  height: 20px;
  min-width: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 6px;
  border: 2px solid #050505; /* Creates a cutout effect against the background */
  pointer-events: none; /* Prevents badge from messing up button clicks */
}

.icon-btn { background: none; border: none; color: #ddd; cursor: pointer; padding: 8px; border-radius: 50%; display: flex; justify-content: center; align-items: center; transition: all 0.3s ease; }
.icon-btn:hover { color: white; background: linear-gradient(135deg, #004d98 0%, #db0030 100%); box-shadow: 0 0 15px rgba(219, 0, 48, 0.6), 0 0 15px rgba(0, 77, 152, 0.6); transform: translateY(-3px); }

/* Modal Styling */
.modal-title { color: white; margin-bottom: 20px; text-align: center; border-bottom: 1px solid #333; padding-bottom: 15px; }
.state-msg { text-align: center; color: #aaa; padding: 30px 0; }
.modal-list { max-height: 450px; overflow-y: auto; display: flex; flex-direction: column; gap: 15px; padding-right: 5px; }
.modal-list::-webkit-scrollbar { width: 6px; }
.modal-list::-webkit-scrollbar-track { background: transparent; }
.modal-list::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
.modal-item { background: #181818; border: 1px solid #333; border-radius: 10px; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s ease; }
.item-info h3 { margin: 0 0 5px 0; color: white; font-size: 18px; }
.item-info p { margin: 0 0 10px 0; color: #aaa; font-size: 14px; }
.seat-badge { background: #222; padding: 4px 8px; border-radius: 4px; font-size: 12px; color: #ddd; border: 1px solid #444; }
.ref-text { margin-top: 10px !important; font-size: 11px !important; color: #666 !important; }
.cart-item:hover { border-color: #00a3e0; cursor: pointer; background: #1c1c1c; transform: translateX(5px); }
.item-action { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.price { font-size: 22px; font-weight: bold; color: #00a3e0; }
.checkout-hint { font-size: 12px; color: #aaa; }
.cart-item:hover .checkout-hint { color: #00a3e0; }
.paid-badge { background: rgba(0, 163, 224, 0.1); color: #00a3e0; padding: 6px 12px; border-radius: 20px; font-weight: bold; border: 1px solid #00a3e0; }
</style>