<template>
  <router-view />
</template>

<style>
/* This style block is NOT scoped, meaning it applies to the whole webpage */
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
  /* Setting a default dark background prevents any white flashing during page loads */
  background-color: #0f0f0f; 
  font-family: sans-serif;
}

/* This ensures borders and padding don't accidentally make elements wider than 100% */
*, *::before, *::after {
  box-sizing: inherit;
}
</style>