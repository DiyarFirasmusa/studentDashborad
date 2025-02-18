<script setup lang="ts">
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField, VRow, VCol, VBtn, VForm } from 'vuetify/components'
import type { Student } from '../../../pages/student/type'
import { requiredValidator } from '@/@core/utils/validators'

const props = defineProps<{
  modelValue: boolean
  student: Student | null
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
  (event: 'save', student: Student): void
}>()

const closeDialog = () => {
  emit('update:modelValue', false)
}

const formRef = ref<VForm | null>(null)

const saveChanges = async () => {
  const { valid } = await formRef.value!.validate() // 🔥 تحقق يدوي
  if (valid && props.student) {
    emit('save', props.student)
    closeDialog()
  }
}
</script>

<template>
  <VDialog :model-value="modelValue" max-width="600px" @update:modelValue="$emit('update:modelValue', $event)">
    <VCard>
      <VCardTitle>تعديل بيانات الطالب</VCardTitle>
      <VCardText>
        <VForm ref="formRef" @submit.prevent="saveChanges">
          <VRow dense>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.first_name" label="الاسم الأول" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.middle_name" label="الاسم الثاني" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.last_name" label="الاسم الثالث" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.nickname" label="الاسم الرابع" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.institution" label="المؤسسة" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.college" label="الكلية" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.department" label="القسم" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.study_type" label="نوع الدراسة" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.level" label="المستوى" :rules="[requiredValidator]" />
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
