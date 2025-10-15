<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue', 'send']);

const localValue = ref(props.modelValue);
const showEmojiPicker = ref(false);
const inputRef = ref<HTMLElement | null>(null);

watch(localValue, (val) => emit('update:modelValue', val));

function scrollToBottom() {
  if (!inputRef.value) return;
  inputRef.value.scrollIntoView({ behavior: 'smooth' });
}

function toggleEmojiPicker() {
  showEmojiPicker.value = !showEmojiPicker.value;
}
function onSelectEmoji(emoji: { i: string }) {
  localValue.value += emoji.i;

  if (inputRef.value) {
    inputRef.value.focus();
  }
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <div class="col-grow" style="position: relative">
    <div style="overflow: hidden; border-radius: 15px">
      <q-input
        v-model="localValue"
        ref="inputRef"
        @update:model-value="scrollToBottom"
        autogrow
        borderless
        dense
        placeholder="Type a message..."
        style="overflow-y: auto; background-color: #3498db; padding-left: 15px"
        input-style="max-height: 150px; color: #ecf0f1; font-size: 16px; overflow-y: auto;"
      >
        <template v-slot:append>
          <q-btn
            flat
            round
            dense
            icon="sentiment_satisfied_alt"
            @click="toggleEmojiPicker"
            style="color: #ecf0f1"
          />
        </template>
      </q-input>
    </div>
    <div
      v-if="showEmojiPicker"
      style="position: absolute; bottom: 60px; right: 10px; z-index: 1000"
    >
      <EmojiPicker :native="true" @select="onSelectEmoji" />
    </div>
    <div
      v-if="showEmojiPicker"
      @click="showEmojiPicker = false"
      style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999"
    />
  </div>
</template>
