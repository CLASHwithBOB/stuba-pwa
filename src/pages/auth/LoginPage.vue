<template>
  <q-page class="window-height window-width row bg-grey-1">
    <div class="col-12 col-md-6 row justify-center items-center">
      <div class="column">
        <div class="row justify-center q-mb-lg">
          <h4 class="text-h4 text-weight-bold q-my-none">Welcome back</h4>
        </div>

        <div class="row justify-center q-mb-xl">
          <p class="text-subtitle1 text-grey-7 q-my-none">Please enter your details</p>
        </div>

        <div class="row">
          <q-card bordered class="q-pa-xl shadow-1" style="border-radius: 12px; width: 400px;">
            <q-card-section class="q-pa-none">
              <q-form class="q-gutter-md">
                <div class="q-mb-md">
                  <label class="text-caption text-weight-medium q-mb-xs block">Email address</label>
                  <q-input
                    outlined
                    v-model="email"
                    type="email"
                    placeholder="Enter your email"
                    class="custom-input"
                  >
                    <template v-slot:prepend>
                      <q-icon name="mail" />
                    </template>
                  </q-input>
                </div>

                <div class="q-mb-sm">
                  <label class="text-caption text-weight-medium q-mb-xs block">Password</label>
                  <q-input
                    outlined
                    v-model="password"
                    :type="isPwd ? 'password' : 'text'"
                    placeholder="Enter your password"
                    class="custom-input"
                  >
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

                <div class="row justify-between items-center q-mb-lg">
                  <q-checkbox
                    v-model="rememberMe"
                    label="Remember for 30 days"
                    class="text-caption"
                  />
                  <a href="#" class="text-caption text-primary text-weight-medium">Forgot password?</a>
                </div>

                <q-btn
                  unelevated
                  color="primary"
                  size="lg"
                  class="full-width q-mb-md custom-btn"
                  label="Sign in"
                  style="height: 48px; font-weight: 600;"
                />

                <div class="text-center">
                  <p class="text-caption text-grey-7 q-my-none">
                    Don't have an account?
                    <a href="#" class="text-primary text-weight-medium">Sign up</a>
                  </p>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="col-md-6 hidden-xs hidden-sm">
      <q-img
        src="https://miro.medium.com/v2/resize:fit:1400/1*9TjgWx0QTHdgM81TzyP-og.jpeg"
        alt="Modern workspace"
        class="full-height"
        style="object-fit: cover;"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const rememberMe = ref(false);
const isPwd = ref(true);
</script>
