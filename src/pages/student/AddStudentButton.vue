<script setup lang="ts">
import { VBtn } from 'vuetify/components';
import { computed } from 'vue';
import { useTheme } from 'vuetify/lib/framework.mjs';
const { global } = useTheme();
const colors = computed(() => global.current.value.colors);

const emit = defineEmits(['click']);
</script>

<template>
  <VBtn color="primary" block @click="$emit('click')">
    <span class="headline" :style="{ color: colors['on-secondary'] }">اضافة طالب جديد</span>
  </VBtn>
</template>