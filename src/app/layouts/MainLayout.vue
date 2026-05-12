<template>
  <div class="main-layout">
    <header>Navbar</header>

    <main>
      <slot />
    </main>

    <footer>Footer</footer>
  </div>
</template>

<style scoped>
.main-layout {
  min-height: 100vh;

  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
