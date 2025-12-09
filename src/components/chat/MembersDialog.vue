<script setup lang="ts">
import type { Channel, User } from 'src/types/models';
import { computed } from 'vue';
import UserAvatar from '../user/UserAvatar.vue';

const props = defineProps<{
  channel: Channel;
  members: User[];
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<template>
  <q-dialog v-model="model">
    <q-card class="q-ma-sm" style="max-width: 600px; width: 100%">
      <q-card-section class="text-h6 text-primary"> {{ channel.name }} Member List </q-card-section>

      <q-separator class="q-my-sm q-mx-md" />

      <q-card-section>
        <q-list class="rounded-borders" dense bordered>
          <q-item class="q-my-xs" v-for="member in members" :key="member.id">
            <q-item-section
              style="
                display: flex;
                flex-direction: row;
                justify-content: start;
                align-items: center;
              "
            >
              <UserAvatar
                :nickname="member.nickname"
                :avatar="member.avatar ?? ''"
                :status="member.status"
              />
              <span style="width: fit-content">{{ member.nickname }}</span>
              <span v-if="member.id === channel.userId" class="q-ml-sm" style="color: gray">
                (Admin)
              </span>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator class="q-my-sm q-mx-md" />

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" @click="model = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
