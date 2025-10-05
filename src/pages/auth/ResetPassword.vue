<script setup lang="ts">
import { ref } from 'vue';

const password = ref('');
const confirmPassword = ref('');
const isPwd = ref(true);
const isConfirmPwd = ref(true);
</script>

<template>
  <q-page class="row items-center justify-center bg-purple-1 page-full">
    <div class="card-wrap">
      <q-card
        bordered
        class="q-pa-xl shadow-1 hidden-xs hidden-sm"
        style="border-radius: 30px; width: 400px"
      >
        <div role="img">
          <div
            class="icon-inner"
            :style="{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#1976d2',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translate(-50%, -50%)',
              overflow: 'visible',
            }"
          >
            <q-icon name="key" size="44px" class="text-white" />
          </div>
        </div>

        <q-card-section class="q-pa-none">
          <div class="row justify-center q-mb-lg">
            <h4 class="text-h4 text-weight-bold q-my-none">Reset password</h4>
          </div>

          <div class="row justify-center q-mb-xl">
            <p class="text-subtitle1 text-grey-9 q-my-none">Please kindly set your new password</p>
          </div>

          <q-form class="q-gutter-md">
            <div class="q-mb-md">
              <label class="text-caption text-weight-medium q-mb-xs block">New password</label>
              <q-input outlined v-model="password" placeholder="Enter new password">
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>

            <div class="q-mb-md">
              <label class="text-caption text-weight-medium q-mb-xs block">Re-enter password</label>
              <q-input
                outlined
                v-model="confirmPassword"
                :type="isConfirmPwd ? 'password' : 'text'"
                placeholder="Re-enter new password"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isConfirmPwd = !isConfirmPwd"
                  />
                </template>
              </q-input>
            </div>
            <q-btn
              type="submit"
              unelevated
              color="primary"
              size="lg"
              class="full-width q-mb-md"
              label="Reset password"
              style="height: 48px; font-weight: 600; border-radius: 25px"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
