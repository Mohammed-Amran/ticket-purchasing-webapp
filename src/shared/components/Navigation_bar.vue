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
const cartCount = ref(0) 

// NEW: Tracks if the Google image fails to load
const imageLoadError = ref(false)

const goHome = () => {
  router.push('/home')
}

// NEW: Handle user logout
const handleLogout = () => {
  localStorage.removeItem('user') // Clear user data
  router.push('/') // Redirect to your login/landing page
}

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

const handleOptimisticUpdate = () => {
  cartCount.value++ 
  fetchCartCount() 
}

onMounted(() => {
  fetchCartCount()
  window.addEventListener('cart-updated', handleOptimisticUpdate)
})

onUnmounted(() => {
  window.removeEventListener('cart-updated', handleOptimisticUpdate)
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
    cartCount.value = response.data.length 
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

      <div class="user-menu-wrapper">
        <img 
          v-if="(user?.photoURL || user?.picture) && !imageLoadError" 
          :src="user.photoURL || user.picture" 
          alt="Profile" 
          class="user-avatar"
          @error="imageLoadError = true"
        />
        <button v-else class="icon-btn fallback-avatar" title="Profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        <div class="dropdown-menu">
          <div class="dropdown-header">
            <span class="user-name">{{ user?.name || 'Guest User' }}</span>
          </div>
          <button class="dropdown-item logout-btn" @click="handleLogout">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            Logout
          </button>
        </div>
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

.cart-wrapper { position: relative; }
.cart-badge { position: absolute; top: -5px; right: -5px; background-color: #e63946; color: white; font-size: 12px; font-weight: bold; height: 20px; min-width: 20px; border-radius: 10px; display: flex; justify-content: center; align-items: center; padding: 0 6px; border: 2px solid #050505; pointer-events: none; }

.icon-btn { background: none; border: none; color: #ddd; cursor: pointer; padding: 8px; border-radius: 50%; display: flex; justify-content: center; align-items: center; transition: all 0.3s ease; }
.icon-btn:hover { color: white; background: linear-gradient(135deg, #004d98 0%, #db0030 100%); box-shadow: 0 0 15px rgba(219, 0, 48, 0.6), 0 0 15px rgba(0, 77, 152, 0.6); transform: translateY(-3px); }

/* ================= USER PROFILE STYLES ================= */
.user-menu-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  /* Adds a tiny gap between cart and profile */
  margin-left: 10px; 
}

.user-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid #333;
  transition: all 0.3s ease;
}

/* Gives the image the same glowing hover effect as the icons */
.user-menu-wrapper:hover .user-avatar,
.user-menu-wrapper:hover .fallback-avatar {
  border-color: #00a3e0;
  box-shadow: 0 0 15px rgba(0, 163, 224, 0.6);
  transform: translateY(-3px);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 15px; /* Pushes it down slightly */
  background-color: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  min-width: 200px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.8);
  
  /* Hidden by default, animates in on hover */
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1001;
}

/* This creates an invisible bridge so the mouse doesn't "fall off" while moving down */
.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -15px;
  left: 0;
  width: 100%;
  height: 15px;
}

.user-menu-wrapper:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-header {
  padding: 15px 20px;
  border-bottom: 1px solid #333;
}

.user-name {
  color: white;
  font-weight: bold;
  font-size: 16px;
  display: block;
  /* Cuts off incredibly long names with an ellipsis */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.dropdown-item {
  width: 100%;
  padding: 15px 20px;
  background: none;
  border: none;
  color: #aaa;
  text-align: left;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.2s ease;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}

.dropdown-item:hover {
  background-color: #222;
  color: #e63946; /* Turns red to indicate a destructive/exit action */
}
/* ======================================================= */

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