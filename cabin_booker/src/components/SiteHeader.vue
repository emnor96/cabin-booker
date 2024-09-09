<script setup>
import { RouterLink } from 'vue-router';
import { useStorage } from '@vueuse/core';

const loginState = useStorage('login-state', false);

function handleLoginState() {
  if (loginState) {
    loginState.value = false;
  }
}
</script>

<template>
  <header>
    <div class="container-lg">
      <nav class="d-flex justify-content-between">
        <RouterLink to="/" class="fw-bold">Boka stuga</RouterLink>
        <div>
          <RouterLink :to="loginState ? '/admin' : '/login'">Admin</RouterLink>
          <RouterLink v-if="loginState" to="/login" class="ms-4" @click="handleLoginState"
            >Logga ut</RouterLink
          >
        </div>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: #000;
  padding: 2rem 0;
  color: #fff;

  nav {
    a {
      color: #fff;

      &:not(:hover) {
        text-decoration: none;
      }
    }
  }
}
</style>
