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

onMounted(() => {
  /* global google */ 
  google.accounts.id.initialize({
    client_id: '688377916800-8ockt885f2vkod6lv5b6prg557vdlkcp.apps.googleusercontent.com',
    callback: handleCredentialResponse
  })
})

const triggerGoogleLogin = () => {
  google.accounts.id.prompt()
}

</script>

<template>
  <AuthLayout>
    <div class="login-container">
      <div class="left-section">
        <img
          src="https://san-i.co.il/wp-content/uploads/2025/11/Camp-Nou-Renovates-San-Interactive--1024x768.jpg"
          alt="Camp Nou"
        />
      </div>

      <div class="right-section">
        <div class="header-row">
          <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" alt="Barcelona Logo" class="logo" />
          <h2>Ticket Purchasing Platform</h2>
        </div>

        <div class="welcome-row">
  <h1>Welcome Back!</h1>

  <div class="form-section">
    <button class="custom-google-btn" @click="triggerGoogleLogin" title="Sign in with Google">
      <img src="../../../shared/utils/images/google.png" alt="Google Logo" />
    </button>
  </div>
</div>

      </div>
    </div>
  </AuthLayout>
</template>

<style scoped>
.login-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
}

.left-section {
  flex: 1;
  background-color: #0a0a0a;
  display: flex;
  justify-content: center;
  align-items: center;
}

.left-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right-section {
  flex: 1;
  background-color: #111;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
}

/* NEW: Flexbox wrapper to put them in the same row */
.welcome-row {
  display: flex;
  align-items: center; 
  justify-content: flex-start; /* This groups them together on the left side */
  gap: 25px; /* Adjust this number to make the space bigger or smaller! */
  margin-bottom: 40px; 
}

h1 {
  font-size: 42px;
  margin: 0; /* Remove the bottom margin so the flex container handles the spacing */
}



.header-row {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.header-row .logo {
  width: 85px;
  height: 85px;
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

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ================= CUSTOM GOOGLE BUTTON ================= */
.custom-google-btn {
  /* Removed white background and fixed dimensions */
  background: transparent;
  border: none;
  display: inline-flex;
  padding: 0;
  cursor: pointer;
  /* Removed button box-shadow */
}

.custom-google-btn img {
  /* Made the image drastically larger */
  width: 65px;
  height: 65px;
  object-fit: contain;
  transition: all 0.3s ease;
  /* Adds a subtle default shadow directly to the PNG shape */
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

.custom-google-btn:hover img {
  transform: translateY(-4px) scale(1.08);
  /* FC Barcelona blue glow applied directly to the logo shape! */
  filter: drop-shadow(0 8px 20px rgba(0, 163, 224, 0.6)); 
}
/* ======================================================== */
</style>