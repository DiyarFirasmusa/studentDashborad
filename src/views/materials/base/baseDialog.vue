<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField, VRow, VCol, VBtn } from 'vuetify/components';

interface Course {
  n: string;
  code: string;
  registrationType: string;
}

const props = defineProps<{
  modelValue: boolean;
  course: Course | null;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
  (event: 'save', course: Course): void;
}>();

const closeDialog = () => {
  emit('update:modelValue', false);
};

const saveChanges = () => {
  if (props.course) {
    emit('save', { ...props.course });
  }
  closeDialog();
};
</script>

<template>
  <VDialog :model-value="modelValue" max-width="500px" @update:modelValue="$emit('update:modelValue', $event)">
    <VCard>
      <VCardTitle>تعديل بيانات المادة</VCardTitle>
      <VCardText>
        <VRow dense>
          <VCol cols="12">
            <VTextField v-model="course!.n" label="اسم المادة" required />
          </VCol>
          <VCol cols="12">
            <VTextField v-model="course!.code" label="كود المادة" required />
          </VCol>
          <VCol cols="12">
            <VTextField v-model="course!.registrationType" label="نوع التسجيل" required />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VBtn color="green" @click="saveChanges">حفظ</VBtn>
        <VBtn color="red" @click="closeDialog">إلغاء</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
