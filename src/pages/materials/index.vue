<template>
  <div>
    <VBtn color="primary" class="mb-4" block @click="addNewCourse()">إضافة كارد جديد</VBtn>
    <VRow>
      <VCol cols="12" md="6" v-for="(course, index) in courses" :key="index">
        <VCard>
          <VCol cols="12" align="center">
            <VIcon size="48" color="primary">mdi-file</VIcon> 
            <VDivider class="mt-4"></VDivider>
          </VCol>

          <VCol cols="12">
            <VCardSubtitle>اسم المقرر</VCardSubtitle>
            <VCardTitle>{{ course.n }}</VCardTitle>
            <VCardSubtitle>رمز المقرر</VCardSubtitle>
            <VCardTitle>{{ course.code }}</VCardTitle>
            <VCardSubtitle>نوع التسجيل على المادة</VCardSubtitle>
            <VCardTitle>{{ course.registrationType }}</VCardTitle>
            <VDivider class="mt-6"></VDivider>
            <VCardActions class="mt-4">
              <VBtn 
                color="primary" 
                variant="elevated" 
                class="px-4 py-2 rounded-lg mx-2"
                @click="deleteCourse(index)">
                حذف
              </VBtn>
              <VBtn
                color="none" 
                variant="outlined" 
                class="px-4 py-2 rounded-lg mx-2"
                @click="editCourse(index)">
                تعديل
              </VBtn>
              <VBtn
                color="success" 
                variant="elevated" 
                class="px-4 py-2 rounded-lg mx-2"
                @click="openResultsDialog(index)">
                نتائج
              </VBtn>
            </VCardActions>
          </VCol>
        </VCard>
      </VCol>
    </VRow>
    
    <EditCourseDialog 
      v-model="isDialogOpen" 
      :course="selectedCourse" 
      @save="saveCourse" 
    />

    <!-- دايلوج النتائج -->
    <VDialog v-model="resultsDialog" max-width="800">
      <VCard>
        <VCardTitle class="headline" :style="{ backgroundColor: colors.primary, color: colors['on-primary'] }">
          نتائج مقرر
        </VCardTitle>
        <VCardText :style="{ backgroundColor: colors.background, color: colors['on-background'] }">
          <!-- الاختبارات مع التفاعل -->
          <VList>
            <VListItem>
              <VBtn
                color="none"
                variant="text"
                @click="toggleQuizzes"
                class="d-flex justify-space-between w-100"
              >
                <VListItemTitle :style="{ color: colors['on-background'] }">الاختبارات Quizzes</VListItemTitle>
                <VIcon>{{ quizzesExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</VIcon>
              </VBtn>
              <VExpandTransition>
                <div v-if="quizzesExpanded">
                  <div v-for="(evaluation, index) in evaluations" :key="index" class="mb-6">
                    <h3 class="text-h6">التقييم : {{ evaluation.id }}</h3>
                    <p class="text-h5">{{ evaluation.score }}</p>
                    <p v-for="(date, i) in evaluation.dates" :key="i" class="text-body-1">{{ date }}</p>
                  </div>
                </div>
              </VExpandTransition>
            </VListItem>

            <!-- العناصر الأخرى -->
            <VListItem>
              <VListItemTitle :style="{ color: colors['on-background'] }">lap المختبر</VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle :style="{ color: colors['on-background'] }">واجبات بيتية Online assignments</VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle :style="{ color: colors['on-background'] }">تقارير Reports</VListItemTitle>
            </VListItem>
          </VList>

          <VDivider class="my-4" :style="{ backgroundColor: colors['border-color'] }" />

          <!-- عدد المركب -->
        </VCardText>
        <VCardActions :style="{ backgroundColor: colors.background }">
          <VSpacer />
          <VBtn 
            color="primary" 
            @click="resultsDialog = false"
            :style="{ color: colors['on-primary'] }"
          >
            إغلاق
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
import { VBtn, VCard, VCardTitle, VCardSubtitle, VCardActions, VDivider, VDialog, VCardText, VList, VListItem, VListItemTitle, VListItemSubtitle, VRow, VCol, VSpacer, VIcon, VExpandTransition } from 'vuetify/components';
import EditCourseDialog from '@/views/materials/base/baseDialog.vue';
import router from '@/router';

const { global } = useTheme();
const courses = ref([
  { n: "مادة 1", code: 'C101', registrationType: 'اجباري' },
  { n: "مادة 2", code: 'C102', registrationType: 'اختياري' }
]);

const selectedCourse = ref(null);
const isDialogOpen = ref(false);
const resultsDialog = ref(false); // حالة فتح وإغلاق دايلوج النتائج
const quizzesExpanded = ref(false); // حالة توسيع الاختبارات

// بيانات التقييمات
const evaluations = ref([
  {
    id: 1,
    score: '12.0/15.0',
    dates: [
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن',
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن'
    ]
  },
  {
    id: 2,
    score: '15.0/15.0',
    dates: [
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن',
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن'
    ]
  },
  {
    id: 3,
    score: '14.0/15.0',
    dates: [
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن',
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن'
    ]
  }
]);

// روابط عدد المركب
const links = ref([
  { text: 'إقام تسلسل المخرجات التعليمية المتعلقة', url: '#' },
  { text: 'حدد المركب', url: '#' },
  { text: 'حدد المركب', url: '#' }
]);

// ألوان الثيم
const colors = computed(() => global.current.value.colors);

const addNewCourse = () => {
  router.push('/add.-new-materials');
};

const deleteCourse = (index) => {
  courses.value.splice(index, 1);
};

const editCourse = (index) => {
  selectedCourse.value = { ...courses.value[index] };
  isDialogOpen.value = true;
};

const saveCourse = (updatedCourse) => {
  const index = courses.value.findIndex(c => c.code === updatedCourse.code);
  if (index !== -1) {
    courses.value[index] = updatedCourse;
  }
};

const openResultsDialog = (index) => {
  resultsDialog.value = true; // افتح دايلوج النتائج
};

// دالة لتوسيع أو طي الاختبارات
const toggleQuizzes = () => {
  quizzesExpanded.value = !quizzesExpanded.value;
};
</script>

<style scoped>
.headline {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 16px;
}
</style>