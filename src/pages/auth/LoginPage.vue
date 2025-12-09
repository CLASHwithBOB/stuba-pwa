<script setup lang="ts">
import CircleIcon from 'components/ui/CircleIcon.vue';
import { useQuasar } from 'quasar';
import PasswordInput from 'src/components/ui/PasswordInput.vue';
import { RESPONSE_TYPE } from 'src/enums/response';
import { useAuth } from 'src/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const { login } = useAuth();
const router = useRouter();

const email = ref('');
const password = ref('');

async function onSubmit() {
  const res = await login({
    email: email.value,
    password: password.value,
  });

  if (res.type === RESPONSE_TYPE.REDIRECT) {
    await router.push(res.url);
    router.go(0);
  } else $q.notify(res.notification);
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="row auth-page">
        <div class="col-12 col-md-6 row justify-center items-center">
          <div class="column q-mt-md">
            <div class="row">
              <q-card class="q-pa-xl shadow-1" bordered style="border-radius: 30px; width: 400px">
                <CircleIcon name="login" />
                <q-card-section class="q-pa-none q-mt-sm">
                  <div class="row justify-center q-mb-xs">
                    <h5 class="text-h5 text-weight-bold q-my-none">Welcome back</h5>
                  </div>

                  <div class="row justify-center q-mb-sm">
                    <p class="text-subtitle2 text-grey-9 q-my-none">Please enter your details</p>
                  </div>

                  <q-form @submit="onSubmit">
                    <div class="q-mb-xs">
                      <label class="text-caption text-weight-medium q-mb-xs block"
                        >Email address</label
                      >
                      <q-input
                        v-model="email"
                        outlined
                        type="email"
                        placeholder="Enter your email"
                        dense
                      >
                        <template v-slot:prepend>
                          <q-icon name="mail" />
                        </template>
                      </q-input>
                    </div>
                    <PasswordInput v-model="password" />

                    <q-btn
                      class="full-width q-mt-xs q-mb-xs"
                      type="submit"
                      unelevated
                      color="primary"
                      size="md"
                      label="Sign in"
                      style="height: 38px; font-weight: 600; border-radius: 25px"
                    />

                    <div class="text-center">
                      <p class="text-caption text-grey-7 q-my-none">
                        Don't have an account?
                        <a class="text-primary text-weight-medium" href="/register">Sign up</a>
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
            src="https://img.freepik.com/free-vector/telecommuting-concept-woman-quarantine_23-2148481304.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Woman chatting on laptop"
            style="object-fit: cover; width: 100%; height: 100%"
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<style lang="sass" scoped>
.auth-page
  background-color: $bg-auth
  height: 100vh
  overflow: hidden
</style>
