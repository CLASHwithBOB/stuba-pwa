<template>
 <q-page class="flex flex-center bg-grey-2">
    <Login @login="handleLogin" />
  </q-page>
</template>

<script setup lang="ts">

interface LoginData {
  username: string;
  password: string;
}


import Login from 'src/pages/auth/Login.vue';

const handleLogin = (loginData : LoginData) => {
  console.log('Login data received in IndexPage:', loginData)
}
</script>
