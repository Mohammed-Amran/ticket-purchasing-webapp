<script setup>
import AuthLayout from '../../../app/layouts/AuthLayout.vue'
import { onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

// Callback function after Google validates the user
const handleCredentialResponse = async (response) => {
  // response.credential is the JWT ID Token we MUST send to the backend
  console.log('Google Credential Received', response.credential)

  const success = await authStore.loginWithGoogle(response.credential)
  if (success) {
    // Redirect to home screen upon success
    router.push({ name: 'home' })
  } else {
    // Show error from authStore
    alert('Google login failed')
  }
}

onMounted(() => {
  // Initialize Google Identity Services script
  /* global google */ // Tell ESLint 'google' is global
  google.accounts.id.initialize({
    // INSERT YOUR GOOGLE CLIENT ID HERE FROM GOOGLE CLOUD CONSOLE
    client_id: 'INSERT_YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com',
    callback: handleCredentialResponse
  });

  // Render the official Google Sign-In button
  google.accounts.id.renderButton(
    document.getElementById('google-btn-container'), // Container ID
    { theme: 'outline', size: 'large', text: 'signin_with', width: '300px' } // Customization
  );
  // OPTIONAL: Also prompt the one-tap UI
  google.accounts.id.prompt();
})

</script>

<template>
  <AuthLayout>
    <div class="login-container">
      <div class="left-section">
        <img
          src="https://san-i.co.il/wp-content/uploads/2025/11/Camp-Nou-Renovates-San-Interactive--1024x768.jpg"
          alt="Barcelona Logo"
        />
      </div>

      <div class="right-section">
        <div class="header-row">
          <img src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg" alt="Barcelona Logo" class="logo" />
          <h2>Ticket Purchasing Platform</h2>
        </div>

        <h1>Welcome Back!</h1>

        <p class="subtitle">Sign in to continue</p>

        <div class="form-section">

         <div id="google-btn-container"></div>

        </div>

      </div>
    </div>
  </AuthLayout>
</template>

<style scoped>
.login-container {
  width: 100%;        /* ← was 900px */
  min-height: 100vh;  /* ← was height: 500px */
  display: flex;
  /* remove border-radius and overflow: hidden */
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

h1 {
  font-size: 42px;

  margin-bottom: 10px;
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

.subtitle {
  color: #aaa;

  margin-bottom: 40px;
}

.form-section {
  display: flex;

  flex-direction: column;

  gap: 20px;
}
</style>
