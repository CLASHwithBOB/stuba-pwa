<script setup lang="ts">
import CircleIcon from 'src/components/ui/CircleIcon.vue';
import PasswordInput from 'src/components/ui/PasswordInput.vue';
import { useAuth } from 'src/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { register } = useAuth();
const router = useRouter();

const firstName = ref('');
const lastName = ref('');
const nickname = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

async function onSubmit() {
  await register({
    firstName: firstName.value,
    lastName: lastName.value,
    nickname: nickname.value,
    email: email.value,
    password: password.value,
    passwordConfirm: confirmPassword.value,
  });

  await router.push('/dashboard');
}
</script>

<template>
  <q-layout>
    <q-page-container>
      <q-page class="row auth-page">
        <div class="col-md-6 hidden-xs hidden-sm">
          <q-img
            src="https://thumbs.dreamstime.com/b/registration-online-entering-accurate-information-vital-successful-online-registration-registration-online-vector-304816947.jpg"
            alt="Woman chatting on laptop"
            style="object-fit: cover; width: 100%; height: 100%"
          />
        </div>

        <div class="col-12 col-md-6 row justify-center items-center">
          <div class="column">
            <div class="row">
              <q-card class="q-pa-lg shadow-1" bordered style="border-radius: 30px; width: 400px">
                <CircleIcon name="person_add" />
                <q-card-section class="q-pa-none">
                  <div class="row justify-center q-mb-md">
                    <h4 class="text-h4 text-weight-bold q-my-none">Create account</h4>
                  </div>

                  <div class="row justify-center q-mb-lg">
                    <p class="text-subtitle1 text-grey-9 q-my-none">Sign up to get started</p>
                  </div>
                  <q-form class="q-gutter-sm" @submit="onSubmit">
                    <div class="q-mb-sm">
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

                    <div class="q-mb-sm">
                      <label class="text-caption text-weight-medium q-mb-xs block">Last Name</label>
                      <q-input v-model="lastName" outlined dense placeholder="Enter your last name">
                        <template v-slot:prepend>
                          <q-icon name="person" size="sm" />
                        </template>
                      </q-input>
                    </div>

                    <div class="q-mb-sm">
                      <label class="text-caption text-weight-medium q-mb-xs block">Nickname</label>
                      <q-input v-model="nickname" outlined dense placeholder="Enter your nickname">
                        <template v-slot:prepend>
                          <q-icon name="tag" size="sm" />
                        </template>
                      </q-input>
                    </div>

                    <div class="q-mb-sm">
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
                      class="full-width q-mb-sm"
                      unelevated
                      type="submit"
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
    </q-page-container>
  </q-layout>
</template>
<style lang="sass" scoped>
.auth-page
  background-color: $bg-auth
</style>
