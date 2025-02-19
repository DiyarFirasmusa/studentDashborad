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

const submitForm = async () => {
  if (vild.value) {
    try {
      const formData = new FormData();
      formData.append("FirstName", data.value.firstName);
      formData.append("SecondName", data.value.secondName);
      formData.append("ThirdName", data.value.thirdName);
      formData.append("LastName", data.value.lastName);
      formData.append("TheTitle", data.value.theTitle);
      formData.append("PhoneNumber", data.value.phoneNumber);
      formData.append("University", data.value.university);
      formData.append("Collage", data.value.collage); // Check if this should be "College"
      formData.append("Department", data.value.department);
      formData.append("ProgramStudy", data.value.programStudy);
      formData.append("Level", data.value.level);
      formData.append("TypeOfStudy", data.value.typeOfStudy);
      formData.append("AcademicDivision", data.value.academicDivision);

      // Check if an image is selected before appending
      if (data.value.image) {
        formData.append("Image", data.value.image);
      }

      const response = await apiClient.post("/students", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(response.data); // Handle the response as needed
      // router.push('/student');
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
    }
  }
};



</script>
