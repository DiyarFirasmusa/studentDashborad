<template>
  <div>
    <VCard class="pa-8">
      <VRow>
        <VCol class="mb-4" cols="12" align="center">
          <h2> إضافة طالب جديد الى الجامعة</h2>
        </VCol>
        <VDivider/>
        <VCol class="mt-6" cols="12">
          <VForm v-model="vild" ref="form" @submit.prevent="submitForm">
            <VRow>
              <VCol cols="12" md="6">
                <VTextField v-model="data.firstName" label="الاسم الأول لطالب" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.secondName" label="الاسم الثاني لطالب" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.thirdName" label="الاسم الثالث لطالب" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.lastName" label="الاسم الرابع لطالب" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.theTitle" label="اللقب" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.phoneNumber" label="رقم الهاتف" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.university" label="اسم المؤسسة" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.collage" label="اسم الجامعة" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.department" label="اسم القسم" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.programStudy" label="البرنامج الدراسي" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.typeOfStudy" label="نوع الدراسة" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.level" label="المستوى" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.academicDivision" label="الشعب الدراسية" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol  cols="12" class="d-flex gap-2 mt-4">
                <VBtn type="submit" color="primary" > <span :style="{color: colors['on-secondary']}">ارسال</span> </VBtn>
                <VBtn color="secondary" variant="outlined" class="px-6 py-3" @click="() => router.push('/student')">
                  <span :style="{color: colors['on-primary']}">رجوع</span>
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { useTheme } from 'vuetify/lib/framework.mjs';
const { global } = useTheme();
const colors = computed(() => global.current.value.colors);
import { emailValidator, passwordValidator, requiredValidator } from  '../@core/utils/validators';

const data = ref({
  firstName: '',
  secondName: '',
  thirdName: '',
  lastName: '',
  phoneNumber: '',
  theTitle: '',
  university: '',
  collage: '',
  department: '',
  programStudy: '',
  typeOfStudy: '',
  level: '',
  academicDivision:'',
  image: null
});

import apiClient from '../Api/apiClient.js'
const vild = ref(false);

const submitForm = async  () => {
  if (vild.value) {
    try {
      const expectedData = {
      firstName: data.value.firstName,
      secondName: data.value.secondName,
      thirdName: data.value.thirdName,
      lastName: data.value.lastName,
      theTitle: data.value.theTitle,
      phoneNumber: data.value.phoneNumber,
      university: data.value.university,
      collage: data.value.collage,
      department: data.value.department,
      programStudy: data.value.programStudy,
      level: data.value.level,
      typeOfStudy: data.value.typeOfStudy,
      academicDivision: data.value.academicDivision,
      image: null
    };
      const response = await apiClient.post('/students' , expectedData)
      console.log(response.data); // Handle the response as needed
      // router.push('/student');
    } catch (error) {
      console.error('Error submitting form:', error);
    }  
  }
};



</script>
