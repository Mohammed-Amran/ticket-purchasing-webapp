<template>
  <div class="auth-layout">
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
