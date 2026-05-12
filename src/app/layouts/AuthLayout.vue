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
  flex-direction: column; /* ← add this */
}

main {
  flex: 1;           /* ← fills all available height */
  display: flex;
  width: 100%;     /* ← lets slot content stretch */
}
</style>