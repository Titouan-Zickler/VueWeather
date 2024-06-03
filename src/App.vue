<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav class="main-nav">
      <span>Weather Vue JS</span>
      <div class="nav-links">
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  width: 100%;
}

.main-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--color-background-soft);
  color: black;
  width: 100%;
}

.logo {
  margin-left: 1rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-right: 1rem;
}

.nav-links a {
  color: black;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.nav-links a.router-link-exact-active {
  background-color: #ccc;
}

main {
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
