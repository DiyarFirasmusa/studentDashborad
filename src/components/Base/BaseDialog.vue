<script setup>

const props = defineProps({
  modelValue: Boolean,
  title: String,
  width: Number | String,
});
const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (v) => emit("update:modelValue", v),
});
</script>
<template>
  <VDialog v-model="model" :width="props.width">
    <VCard class="rounded-lg !shadow-none bg-white dark:bg-secondary-500">
      <VCardTitle class="d-flex pa-4 align-center dialog-header bg-white dark:bg-black">
        {{ props.title }}
        <VSpacer />
        <AIconButton
          @click="emit('update:modelValue', false)"
          variant="tonal"
          elevation="0"
          icon="mdi-close"
          density="comfortable"
          color="secondary-500"
        />
      </VCardTitle>
      <VDivider />
      <VCardText class="bg-white dark:bg-black">
        <slot name="default" />
      </VCardText>
      <VDivider />
      <VCardText class="dialog-actions bg-white dark:bg-black">
        <slot name="actions" />
      </VCardText>
    </VCard>
  </VDialog>
</template>
<style>
.dialog-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
.dialog-actions {
  position: sticky;
  bottom: 0;
  z-index: 1000;
}
</style>
