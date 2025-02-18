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
                <VTextField v-model="data.name1" label="الاسم الأول لطالب" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.name2" label="الاسم الثاني لطالب" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.name3" label="الاسم الثالث لطالب" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.name4" label="الاسم الرابع لطالب" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.institution" label="اسم المؤسسة" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.collegeName" label="اسم الجامعة" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.departmentName" label="اسم القسم" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.typeStudey" label="نوع الدراسة" :rules=[requiredValidator] ></VTextField>
              </VCol>
              <VCol cols="12">
                <VTextField v-model="data.level" label="المستوى" :rules=[requiredValidator] ></VTextField>
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
  name1: '',
  name2: '',
  name3: '',
  name4: '',
  institution: '',
  collegeName: '',
  departmentName: '',
  typeStudey: '',
  level: '',
});
const vild = ref(false);

const submitForm = () => {
  if (vild.value) {
    console.log(data.value.collegeName);
    router.push('/student');
  }
};



</script>
