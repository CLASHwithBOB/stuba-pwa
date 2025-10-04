<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const submitting = ref(false);
const success = ref(false);
const error = ref('');

const sendReset = async () => {
  error.value = '';
  success.value = false;

  const emailVal = (email.value || '').trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailVal || !emailRe.test(emailVal)) {
    error.value = 'Please enter a valid email address.';
    return;
  }

  submitting.value = true;
  try {
    await new Promise((r) => setTimeout(r, 400));
    success.value = true;
  } catch {
    error.value = 'Unable to send reset link. Try again later.';
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <q-page class="row bg-purple-1">
    <div class="col-12 col-md-6 row justify-center items-center">
      <div class="column">
        <div class="row justify-center q-mb-lg">
          <h4 class="text-h4 text-weight-bold q-my-none">Forgot password</h4>
        </div>

        <div class="row justify-center q-mb-xl">
          <p class="text-subtitle1 text-grey-9 q-my-none">
            Enter your email and we'll send a link to reset your password.
          </p>
        </div>

        <div class="row">
          <q-card bordered class="q-pa-xl shadow-1" style="border-radius: 30px; width: 400px">
            <q-card-section class="q-pa-none">
              <q-form class="q-gutter-md" @submit.prevent="sendReset">
                <div class="q-mb-md">
                  <label class="text-caption text-weight-medium q-mb-xs block">Email address</label>
                  <q-input outlined v-model="email" type="email" placeholder="Enter your email">
                    <template v-slot:prepend>
                      <q-icon name="mail" />
                    </template>
                  </q-input>
                </div>

                <div v-if="error" class="text-negative q-mb-sm text-caption">
                  {{ error }}
                </div>

                <div v-if="success" class="text-positive q-mb-sm text-caption">
                  Reset link sent. Check your inbox.
                </div>

                <q-btn
                  type="submit"
                  :loading="submitting"
                  unelevated
                  color="primary"
                  size="lg"
                  class="full-width q-mb-md"
                  label="Send reset link"
                  style="height: 48px; font-weight: 600; border-radius: 25px"
                />

                <div class="text-center">
                  <p class="text-caption text-grey-7 q-my-none">
                    Remembered your password?
                    <a href="/login" class="text-primary text-weight-medium">Sign in</a>
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
        src="https://static.vecteezy.com/system/resources/previews/016/462/187/non_2x/forgot-the-password-illustration-concept-on-white-background-vector.jpg"
        alt="Forgot password illustration"
        style="object-fit: cover; width: 100%; height: 100%"
      />
    </div>
  </q-page>
</template>


