<script setup lang="ts">
import { ref } from 'vue';
import PasswordInput from 'components/PasswordInput.vue';
import CircleIcon from 'components/CircleIcon.vue';
const password = ref('');
</script>

<template>
  <q-page class="row items-center justify-center bg-purple-1 page-full">
    <div class="card-wrap">
      <q-card
        class="q-pa-xl shadow-1 hidden-xs hidden-sm"
        bordered
        style="border-radius: 30px; width: 400px"
      >
        <CircleIcon name="key" />

        <q-card-section class="q-pa-none">
          <div class="row justify-center q-mb-lg">
            <h4 class="text-h4 text-weight-bold q-my-none">Reset password</h4>
          </div>

          <div class="row justify-center q-mb-xl">
            <p class="text-subtitle1 text-grey-9 q-my-none">Please kindly set your new password</p>
          </div>

          <q-form class="q-gutter-md">
            <PasswordInput v-model="password" />
            <PasswordInput
              v-model="password"
              label="Confirm password"
              placeholder="Confirm your password"
            />

            <q-btn
              class="full-width q-mb-md"
              type="submit"
              unelevated
              color="primary"
              size="lg"
              label="Reset password"
              style="height: 48px; font-weight: 600; border-radius: 25px"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
