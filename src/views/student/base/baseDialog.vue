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
  <VDialog :model-value="modelValue" max-width="600px" @update:modelValue="$emit('update:modelValue', $event)" persistent>
    <VCard>
      <VCardTitle>تعديل بيانات الطالب</VCardTitle>
      <VCardText>
        <VForm ref="formRef" @submit.prevent="saveChanges">
          <VRow dense>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.firstName" label="الاسم الأول" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.secondName" label="الاسم الثاني" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.thirdName" label="الاسم الثالث" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.lastName" label="الاسم الرابع" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.theTitle" label="اللقب" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.phoneNumber" label="رقم الهاتف" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.university" label="المؤسسة" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.collage" label="الكلية" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.department" label="القسم" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.typeOfStudy" label="نوع الدراسة" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.programStudy" label="البرنامج الدراسي" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.level" label="المستوى" :rules="[requiredValidator]" />
            </VCol>
            <VCol cols="12" md="6">
              <VTextField v-model="student!.academicDivision" label="الشعبة الدراسية" :rules="[requiredValidator]" />
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
