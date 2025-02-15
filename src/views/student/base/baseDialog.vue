<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VTextField, VRow, VCol, VBtn } from 'vuetify/components'
import type { Student } from '../../../pages/student/type'

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

const saveChanges = () => {
  if (props.student) {
    emit('save', { ...props.student })
  }
  closeDialog()
}
</script>

<template>
  <VDialog :model-value="modelValue" max-width="600px" @update:modelValue="$emit('update:modelValue', $event)">
    <VCard>
      <VCardTitle>تعديل بيانات الطالب</VCardTitle>
      <VCardText>
        <VRow dense>
          <VCol cols="12" md="6">
            <VTextField v-model="student!.first_name" label="الاسم الأول" required />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="student!.middle_name" label="الاسم الثاني" required />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="student!.last_name" label="الاسم الثالث" required />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="student!.nickname" label="الاسم الرابع" required />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="student!.institution" label="المؤسسة" required />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="student!.college" label="الكلية" required />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="student!.department" label="القسم" required />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="student!.study_type" label="نوع الدراسة" required />
          </VCol>
          <VCol cols="12" md="6">
            <VTextField v-model="student!.level" label="المستوى" required />
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
