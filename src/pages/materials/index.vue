<template>
  <div>
    <VBtn color="primary" class="mb-4 " block @click="addNewCourse()">
      <p class="headline mt-4" :style="{color: colors['on-success']}">اضافة مادة جديدة</p>
    </VBtn>
    <VRow>
      <VCol cols="12" md="6" v-for="(course, index) in courses" :key="index">
        <VCard>
          <VCol cols="12" align="center">
            <VIcon size="48" color="primary">tabler:layout-sidebar-left-expand-filled</VIcon> 
            <VDivider class="mt-4"></VDivider>
          </VCol>

          <VCol cols="12">
            <VCardSubtitle>اسم المقرر</VCardSubtitle>
            <VCardTitle :style="{ color: colors['on-primary'] }">{{ course.n }}</VCardTitle>
            <VCardSubtitle>رمز المقرر</VCardSubtitle>
            <VCardTitle :style="{ color: colors['on-primary'] }">{{ course.code }}</VCardTitle>
            <VCardSubtitle>نوع التسجيل على المادة</VCardSubtitle>
            <VCardTitle :style="{ color: colors['on-primary'] }">{{ course.registrationType }}</VCardTitle>
            <VDivider class="mt-6"></VDivider>
            <VCardActions class="mt-4">
              <VRow>
                <VCol cols="`6">
                  <VBtn 
                  block
                  color="none" 
                  variant="outlined" 
                  class="px-4 py-2 rounded-lg mx-2"
                  @click="deleteCourse(index)">
                  حذف
                </VBtn>
                </VCol>
                <VCol cols="6">
                  <VBtn
                  block
                  color="none" 
                  variant="outlined" 
                  class="px-4 py-2 rounded-lg mx-2"
                  @click="editCourse(index)">
                  تعديل
                </VBtn>
                </VCol>
                <VCol cols="12">
                  <VBtn
                    block
                    color="grey-50" 
                    variant="elevated" 
                    class="px-4 py-2 rounded-lg mx-2"
                    append-icon="mdi-chart-bar"
                    @click="openResultsDialog(index)">
                    نتائج
                  </VBtn>
                </VCol>
              </VRow>
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
    <ResaultCourseDialog v-model="resultsDialog"/>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';
import { VBtn, VCard, VCardTitle, VCardSubtitle, VCardActions, VDivider, VDialog, VCardText, VList, VListItem, VListItemTitle, VListItemSubtitle, VRow, VCol, VSpacer, VIcon, VExpandTransition } from 'vuetify/components';
import EditCourseDialog from '@/views/materials/base/baseDialog.vue';
import router from '@/router';
import ResaultCourseDialog from '@/views/materials/base/baseResaultCourseDialog.vue';

const { global } = useTheme();
const courses = ref([
  { n: "مادة 1", code: 'C101', registrationType: 'اجباري' },
  { n: "مادة 2", code: 'C102', registrationType: 'اختياري' }
]);

const selectedCourse = ref(null);
const isDialogOpen = ref(false);
const resultsDialog = ref(false); 

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
  resultsDialog.value = true; 
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