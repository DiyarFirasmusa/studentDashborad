<template>
  <div>
    <VCard class="pa-8">
      <VRow>
        <VCol class="mb-4" cols="12" align="center">
          <h2>إضافة مقرر جديد</h2>
        </VCol>
        <VDivider />
        <VCol class="mt-6" cols="12">
          <VForm v-model="valid" ref="form" @submit.prevent="submitForm">
            <VRow>
              <VCol cols="12" md="6">
                <VTextField v-model="data.courseName" label="اسم المقرر" :rules="rules" required />
              </VCol>
              <VCol cols="12" md="6">
                <VTextField v-model="data.courseCode" label="رمز المقرر" :rules="rules" required />
              </VCol>
              <VCol cols="12">
                <VSelect
                  v-model="data.registrationType"
                  label="نوع التسجيل على المدة"
                  :items="registrationTypes"
                  :rules="rules"
                  required
                />
              </VCol>
              <VCol cols="12" class="d-flex gap-2 mt-4">
                <VBtn type="submit" color="primary">إرسال</VBtn>
                <VBtn color="secondary" variant="outlined" class="px-6 py-3" @click="() => router.push('/courses')">
                  رجوع
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

const data = ref({
  courseName: '',
  courseCode: '',
  registrationType: '',
});

const valid = ref(false);

const rules = [v => !!v || 'هذا الحقل مطلوب'];

const registrationTypes = ['امتحانا', 'حضورا', 'حضورا وامتحانا']; // قائمة بأنواع التسجيل

const submitForm = () => {
  if (valid.value) {
    console.log(data.value);
    router.push('/courses'); // تغيير المسار بعد الحفظ
  }
};
</script>
