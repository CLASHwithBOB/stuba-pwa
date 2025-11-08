<script setup lang="ts">
import { useQuasar } from 'quasar';
import CircleIcon from 'src/components/ui/CircleIcon.vue';
import PasswordInput from 'src/components/ui/PasswordInput.vue';
import { RESPONSE_TYPE } from 'src/enums/response';
import { useAuth } from 'src/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const { register } = useAuth();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const nickname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

async function onSubmit() {
  const res = await register({
    firstName: firstName.value,
    lastName: lastName.value,
    nickname: nickname.value,
    email: email.value,
    password: password.value,
    passwordConfirm: confirmPassword.value,
  });

  if (res.type === RESPONSE_TYPE.REDIRECT) {
    await router.push(res.url);
    router.go(0);
  } else if (res.type === RESPONSE_TYPE.NOTIFICATION) $q.notify(res.notification);
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="row auth-page">
        <div class="col-md-6 hidden-xs hidden-sm">
          <q-img
            src="https://img.freepik.com/premium-vector/apply-jobs-abstract-concept-vector-illustration_107173-24641.jpg"
            alt="Man registering on the app"
            style="object-fit: cover; width: 100%; height: 100%"
          />
        </div>

        <div class="col-12 col-md-6 row justify-center items-center">
          <div class="column" style="margin-top: -30px">
            <div class="row">
              <q-card class="q-pa-md shadow-1" bordered style="border-radius: 30px; width: 400px">
                <CircleIcon name="person_add" />
                <q-card-section class="q-pa-none q-mt-sm">
                  <div class="row justify-center q-mb-xs">
                    <h5 class="text-h5 text-weight-bold q-my-none">Create account</h5>
                  </div>

                  <div class="row justify-center q-mb-sm">
                    <p class="text-subtitle2 text-grey-9 q-my-none">Sign up to get started</p>
                  </div>
                  <q-form @submit="onSubmit">
                    <div class="q-mb-xs">
                      <label class="text-caption text-weight-medium q-mb-xs block"
                        >First Name</label
                      >
                      <q-input
                        v-model="firstName"
                        outlined
                        dense
                        placeholder="Enter your first name"
                      >
                        <template v-slot:prepend>
                          <q-icon name="person" size="sm" />
                        </template>
                      </q-input>
                    </div>

                    <div class="q-mb-xs">
                      <label class="text-caption text-weight-medium q-mb-xs block">Last Name</label>
                      <q-input v-model="lastName" outlined dense placeholder="Enter your last name">
                        <template v-slot:prepend>
                          <q-icon name="person" size="sm" />
                        </template>
                      </q-input>
                    </div>

                    <div class="q-mb-xs">
                      <label class="text-caption text-weight-medium q-mb-xs block">Nickname</label>
                      <q-input v-model="nickname" outlined dense placeholder="Enter your nickname">
                        <template v-slot:prepend>
                          <q-icon name="tag" size="sm" />
                        </template>
                      </q-input>
                    </div>

                    <div class="q-mb-xs">
                      <label class="text-caption text-weight-medium q-mb-xs block"
                        >Email address</label
                      >
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
                    <PasswordInput v-model="password" />
                    <PasswordInput
                      v-model="confirmPassword"
                      label="Confirm password"
                      placeholder="Confirm your password"
                    />

                    <q-btn
                      class="full-width q-mt-xs q-mb-xs"
                      unelevated
                      type="submit"
                      color="primary"
                      size="md"
                      label="Sign up"
                      style="height: 38px; font-weight: 600; border-radius: 25px"
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
    </q-page-container>
  </q-layout>
</template>
<style lang="sass" scoped>
.auth-page
  background-color: $bg-auth
  height: 100vh
  overflow: hidden
</style>
