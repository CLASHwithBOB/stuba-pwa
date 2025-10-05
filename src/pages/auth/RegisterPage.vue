<script setup lang="ts">
import { ref } from 'vue';

const nickname = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const displayPassword = ref(false);
const displayPasswordConfirm = ref(false);
</script>
<template>
  <q-page class="row items-center justify-center">
    <q-card class="w-full">
      <q-card-section>
        <div class="text-h6">Sign up</div>
        <div class="text-subtitle2 text-grey-6">Enter your information to create an account</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <form class="q-gutter-md">
          <q-input v-model="nickname" label="Nickname" outlined dense />
          <q-input v-model="email" type="email" label="Email" outlined dense />
          <q-input
            v-model="password"
            :type="displayPassword ? 'text' : 'password'"
            label="Password"
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="displayPassword ? 'visibility_off' : 'visibility'"
                @click="displayPassword = !displayPassword"
              />
            </template>
          </q-input>
          <q-input
            v-model="passwordConfirm"
            label="Confirm Password"
            :type="displayPasswordConfirm ? 'text' : 'password'"
            outlined
            dense
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="displayPasswordConfirm ? 'visibility_off' : 'visibility'"
                @click="displayPasswordConfirm = !displayPasswordConfirm"
              />
            </template>
          </q-input>
        </form>
      </q-card-section>

      <q-card-actions class="q-px-md" vertical>
        <q-btn color="primary">Create an account</q-btn>
      </q-card-actions>

      <q-card-section class="text-center">
        <p class="text-grey-6">
          Already have an account?
          <router-link class="text-primary" to="/login">Log in</router-link>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<style scoped>
.q-page {
  align-items: start;
}

.q-card {
  width: 100%;
  height: 100vh;
}

@media (min-width: 480px) {
  .q-page {
    align-items: center;
  }

  .q-card {
    width: auto;
    height: auto;
  }
}
</style>
