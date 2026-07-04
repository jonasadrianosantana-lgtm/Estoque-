<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <RouterLink class="navbar-brand" to="/">Estoque App</RouterLink>
        <div class="navbar-nav">
          <RouterLink class="nav-link" to="/">Cadastro Usuário</RouterLink>
          <RouterLink class="nav-link" to="/estoque">Estoque</RouterLink>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header { margin-bottom: 2rem; }
</style>
