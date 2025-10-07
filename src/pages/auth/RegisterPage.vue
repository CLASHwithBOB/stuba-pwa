<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isPwd = ref(true);
const isConfirmPwd = ref(true);
</script>

<template>
  <q-page class="row bg-purple-1">
    <div class="col-md-6 hidden-xs hidden-sm">
      <q-img
        src="https://thumbs.dreamstime.com/b/registration-online-entering-accurate-information-vital-successful-online-registration-registration-online-vector-304816947.jpg"
        alt="Woman chatting on laptop"
        style="max-height: 100vh; object-fit: cover; width: 100%"
      />
    </div>

    <div class="col-12 col-md-6 row justify-center items-center">
      <div class="column">
        <div class="row">
          <q-card class="q-pa-lg shadow-1" bordered style="border-radius: 30px; width: 400px">
            <div role="img">
              <div class="icon-inner">
                <q-icon class="text-white" name="person_add" size="44px" />
              </div>
            </div>
            <q-card-section class="q-pa-none">
              <div class="row justify-center q-mb-md">
                <h4 class="text-h4 text-weight-bold q-my-none">Create account</h4>
              </div>

              <div class="row justify-center q-mb-lg">
                <p class="text-subtitle1 text-grey-9 q-my-none">Sign up to get started</p>
              </div>
              <q-form class="q-gutter-sm">
                <div class="q-mb-sm">
                  <label class="text-caption text-weight-medium q-mb-xs block">Username</label>
                  <q-input
                    v-model="username"
                    outlined
                    dense
                    type="text"
                    placeholder="Enter your username"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" size="sm" />
                    </template>
                  </q-input>
                </div>

                <div class="q-mb-sm">
                  <label class="text-caption text-weight-medium q-mb-xs block">Email address</label>
                  <q-input
                    v-model="email"
                    outlined
                    dense
                    type="email"
                    placeholder="Enter your email"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mail" size="sm" />
                    </template>
                  </q-input>
                </div>

                <div class="q-mb-sm">
                  <label class="text-caption text-weight-medium q-mb-xs block">Password</label>
                  <q-input
                    v-model="password"
                    outlined
                    dense
                    :type="isPwd ? 'password' : 'text'"
                    placeholder="Enter your password"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" size="sm" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        class="cursor-pointer"
                        size="sm"
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>

                <div class="q-mb-sm">
                  <label class="text-caption text-weight-medium q-mb-xs block"
                    >Confirm Password</label
                  >
                  <q-input
                    v-model="confirmPassword"
                    outlined
                    dense
                    :type="isConfirmPwd ? 'password' : 'text'"
                    placeholder="Confirm your password"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" size="sm" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        class="cursor-pointer"
                        size="sm"
                        :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                        @click="isConfirmPwd = !isConfirmPwd"
                      />
                    </template>
                  </q-input>
                </div>

                <q-btn
                  class="full-width q-mb-sm"
                  unelevated
                  color="primary"
                  size="md"
                  label="Sign up"
                  style="height: 42px; font-weight: 600; border-radius: 25px"
                />

                <div class="text-center">
                  <p class="text-caption text-grey-7 q-my-none">
                    Already have an account?
                    <a class="text-primary text-weight-medium" href="/login">Sign in</a>
                  </p>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.icon-inner {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1976d2;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: visible;
}
</style>
