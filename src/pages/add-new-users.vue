<template>
  <div>
    <VCard class="pa-8">
      <VRow>
        <VCol class="mb-4" cols="12" align="center">
          <h2>إضافة مستخدم جديد</h2>
        </VCol>
        <VDivider />
        <VCol class="mt-6" cols="12">
          <VForm v-model="valid" ref="form" @submit.prevent="submitForm">
            <VRow>
              <!-- الاسم -->
              <VCol cols="12" md="6">
                <VTextField v-model="data.name" label="الاسم" :rules="rules" required />
              </VCol>

              <!-- العنوان -->
              <VCol cols="12" md="6">
                <VTextField v-model="data.address" label="العنوان" :rules="rules" required />
              </VCol>

              <!-- العنوان الوظيفي -->
              <VCol cols="12" md="6">
                <VTextField v-model="data.jobTitle" label="العنوان الوظيفي" :rules="rules" required />
              </VCol>

              <!-- الإيميل -->
              <VCol cols="12" md="6">
                <VTextField v-model="data.email" label="الإيميل" type="email" :rules="emailRules" required />
              </VCol>

              <!-- كلمة المرور -->
              <VCol cols="12" md="6">
                <VTextField v-model="data.password" label="كلمة المرور" type="password" :rules="rules" required />
              </VCol>

              <!-- الرتبة -->
              <VCol cols="12" md="6">
                <VSelect
                  v-model="data.rank"
                  label="الرتبة"
                  :items="['مدرس', 'طالب']"
                  :rules="rules"
                  required
                />
              </VCol>

              <!-- الصلاحيات (اختيار متعدد) -->
              <VCol cols="12">
                <VSelect
                  v-model="data.permissions"
                  label="الصلاحيات"
                  :items="permissionsList"
                  multiple
                  chips
                  :rules="rules"
                  required
                />
              </VCol>

              <!-- الحالة -->
              <VCol cols="12">
                <VSwitch v-model="data.status" label="الحالة (مفعل / غير مفعل)" />
              </VCol>

              <!-- الأزرار -->
              <VCol cols="12" class="d-flex gap-2 mt-4">
                <VBtn type="submit" color="primary">إرسال</VBtn>
                <VBtn color="secondary" variant="outlined" class="px-6 py-3" @click="() => router.push('/users')">
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
  name: '',
  address: '',
  jobTitle: '',
  email: '',
  password: '',
  rank: '',
  permissions: [],
  status: false,
});

const valid = ref(false);

const rules = [v => !!v || 'هذا الحقل مطلوب'];
const emailRules = [
  v => !!v || 'هذا الحقل مطلوب',
  v => /.+@.+\..+/.test(v) || 'الإيميل غير صالح',
];

const permissionsList = ['إضافة', 'تعديل', 'حذف', 'عرض', 'إدارة المستخدمين', 'الوصول إلى التقارير']; // قائمة الصلاحيات

const submitForm = () => {
  if (valid.value) {
    console.log(data.value);
    router.push('/users'); // تغيير المسار بعد الحفظ
  }
};
</script>
