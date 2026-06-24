<script setup>
import AuthLayout from '../../../app/layouts/AuthLayout.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Callback function after Google validates the user
const handleCredentialResponse = async (response) => {
  console.log('Google Credential Received', response.credential)

  const success = await authStore.loginWithGoogle(response.credential)
  if (success) {
    router.push({ name: 'home' })
  } else {
    alert('Google login failed')
  }
}

// NEW: A dedicated function to initialize Google once it's actually loaded
const initGoogleSignIn = () => {
  /* global google */ 
  google.accounts.id.initialize({
    client_id: '688377916800-8ockt885f2vkod6lv5b6prg557vdlkcp.apps.googleusercontent.com',
    callback: handleCredentialResponse
  })

  google.accounts.id.renderButton(
    document.getElementById('google-btn-container'),
    { 
      theme: 'filled_black', 
      size: 'large', 
      shape: 'pill',         
      text: 'signin_with'    
    }
  )
}

onMounted(() => {
  // Check if the Google script is already loaded
  if (window.google && window.google.accounts) {
    initGoogleSignIn()
    return
  }

  // If not loaded, inject the script into the document and wait for it
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  
  // When the script finishes downloading, trigger our setup function
  script.onload = () => {
    initGoogleSignIn()
  }
  
  document.head.appendChild(script)
})
</script>

<template>
  <AuthLayout>
    <div class="login-container">
      
      <div class="left-section">
        <img
          src="https://www.fcbarcelona.com/fcbarcelona/photo/2025/11/22/1a6fffc4-0d01-4a8c-aec7-a96349e6672c/_GP22073.jpg"
          alt="Camp Nou"
        />
      </div>

      <div class="right-section">
        
        <div class="top-header-bar">
          <div class="header-row">
            <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" alt="Barcelona Logo" class="logo" />
            <h2>Ticket Purchasing Platform</h2>
          </div>
        </div>

        <div class="login-content-area">
          <div class="dim-overlay">
            
            <div class="welcome-row">
              <h1>Welcome Back!</h1>

              <div class="form-section">
                <div id="google-btn-container"></div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </AuthLayout>
</template>

<style scoped>
/* Ensure the page takes up exactly the screen height to prevent scrolling glitches */
.login-container {
  width: 100%;
  height: 100vh; 
  display: flex;
}

.left-section {
  flex: 1;
  background-color: #0a0a0a;
}

.left-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ================= RIGHT SECTION LAYOUT ================= */
.right-section {
  flex: 1;
  display: flex;
  flex-direction: column; /* Stacks the header and the background area perfectly */
  color: white;
  background-color: #050505; 
}

/* ================= TOP HEADER BAR ================= */
.top-header-bar {
  background-color: #050505; 
  padding: 40px 60px; 
  border-bottom: 1px solid #1a1a1a; 
}

.header-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.header-row .logo {
  width: 75px;
  height: 75px;
  flex-shrink: 0; 
}

.header-row h2 {
  font-size: 32px;
  margin: 0;
  font-weight: 600;
  background: linear-gradient(135deg, #00a3e0 0%, #e63946 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ================= LOGIN CONTENT AREA ================= */
.login-content-area {
  flex: 1; /* Stretches to fill all remaining space below the header */
  background-image: url('https://cadenaser.com/resizer/v2/EYWYKTCIPBCFNA5DCK65U4BW74.jpg?auth=281dbd4fc0ae471f17aab8cf83fc97de3ff2bb852ee7efe346bccc75d9d5a76a');
  background-size: cover;
  background-position: center;
  display: flex; 
}

.dim-overlay {
  flex: 1; 
  background-color: rgba(12, 12, 12, 0.88); /* Deep cinematic darkness */
  display: flex;
  align-items: center; /* Vertically centers the content */
  padding: 0 60px; 
}

.welcome-row {
  display: flex;
  align-items: center; 
  justify-content: flex-start; 
  gap: 30px; 
  width: 100%;
}

h1 {
  font-size: 52px; 
  margin: 0; 
  letter-spacing: -1px;
}

.form-section {
  display: flex;
  flex-direction: column;
}
</style>