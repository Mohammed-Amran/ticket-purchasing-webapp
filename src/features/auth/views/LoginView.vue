<script setup>
import AuthLayout from '../../../app/layouts/AuthLayout.vue'

import InputFields from '../../../shared/components/input_fields.vue'
import PrimaryButton from '../../../shared/components/primary_button.vue'

import { ref } from 'vue'

import { useAuthStore } from '../stores/authStore';

const email = ref('');
const password = ref('');

const authStore = useAuthStore();

async function loginUser() {

                            await authStore.login(email.value, password.value);
  
                           } // Closing brace of the 'loginUser()' method.




</script>

<template>
  <AuthLayout>
    <div class="login-container">
      <div class="left-section">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
          alt="Barcelona Logo"
        />
      </div>

      <div class="right-section">
        <h1>Welcome Back!</h1>

        <p class="subtitle">Sign in to continue</p>

        <div class="form-section">

          <InputFields v-model="email" placeholder="Email" type="email" />

          <InputFields v-model="password" placeholder="Password" type="password" />

          <PrimaryButton text="SIGN IN" @click="loginUser" />

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
  width: 280px;
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
