<script setup>
import { computed, nextTick, ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const loginState = useStorage('login-state', false);
const loginError = ref(false);
const usernameInput = ref(null);
const router = useRouter();

function verifyLogin() {
  if (username.value === 'admin' && password.value === 'password123') {
    loginState.value = true;

    nextTick(() => {
      router.push('/admin');
    });
  } else {
    loginError.value = true;
    usernameInput.value.focus();
  }
}
</script>

<template>
  <div class="container-lg pb-6">
    <h1 id="h1" class="text-center">Logga in adminportalen</h1>
    <form @submit.prevent="verifyLogin" class="w-50 mx-auto">
      <p
        v-if="loginError"
        id="errorMsg"
        class="border border-danger rounded text-danger fw-bold p-2"
      >
        Användarnamnet eller lösenordet är felaktigt!
      </p>
      <div class="mb-3">
        <label for="username" class="form-label">Användarnamn</label>
        <input
          type="text"
          class="form-control"
          id="username"
          ref="usernameInput"
          :aria-describedby="loginError ? 'errorMsg' : null"
          :aria-invalid="loginError || null"
          @input="loginError = false"
          v-model="username"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Lösenord</label>
        <input
          type="password"
          class="form-control"
          id="password"
          :aria-describedby="loginError ? 'errorMsg' : null"
          :aria-invalid="loginError || null"
          @input="loginError = false"
          v-model="password"
        />
      </div>
      <button class="btn btn-primary w-100" type="submit">Logga in</button>
    </form>
  </div>
</template>