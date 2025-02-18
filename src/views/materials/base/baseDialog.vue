<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import { VForm, VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField, VRow, VCol, VBtn } from 'vuetify/components';
import { requiredValidator } from '@/@core/utils/validators';

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

const formRef = ref<VForm | null>(null); // 🔥 مرجع لنموذج الـ VForm

const closeDialog = () => {
  emit('update:modelValue', false);
};

const saveChanges = async () => {
  const { valid } = await formRef.value!.validate(); // 🔥 التحقق يدويًا عند الحفظ
  if (valid && props.course) {
    emit('save', { ...props.course });
    closeDialog();
  }
};
</script>

<template>
  <VDialog :model-value="modelValue" max-width="500px" @update:modelValue="$emit('update:modelValue', $event)">
    <VCard>
      <VCardTitle>تعديل بيانات المادة</VCardTitle>
      <VCardText>
        <VForm ref="formRef">  <!-- 🔥 استخدم ref بدلاً من v-model -->
          <VRow dense>
            <VCol cols="12">
              <VTextField v-model="course!.n" label="اسم المادة" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="course!.code" label="كود المادة" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12">
              <VTextField v-model="course!.registrationType" label="نوع التسجيل" :rules="[requiredValidator]" />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
      <VCardActions>
        <VBtn color="green" @click="saveChanges">حفظ</VBtn>
        <VBtn color="red" @click="closeDialog">إلغاء</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
