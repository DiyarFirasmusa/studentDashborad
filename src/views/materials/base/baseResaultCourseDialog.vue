<template>
    <div>
        <VDialog :model-value="modelValue"
         max-width="800">
      <VCard>
        <VCardTitle class="headline" :style="{ backgroundColor: colors.primary, color: colors['on-primary'] }">
          <span class="headline">نتائج مقرر</span>
        </VCardTitle>
        <VCardText :style="{ backgroundColor: colors.background, color: colors['on-background'] }">
          <VList :style="{ color: colors['background'],backgroundColor: colors['on-primary'] }">
            <VListItem class="pa-0 " >
                <div style="width: 100%;" :style="{backgroundColor: colors['on-primary']}">
                    <VBtn
                        color="none"
                        variant="text"
                        @click="toggleQuizzes"
                        class=""
                    >
                        <VListItemTitle :style="{ color: colors['background'] }">الاختبارات Quizzes</VListItemTitle>
                        <VIcon>{{ quizzesExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</VIcon>
                    </VBtn>
                </div>
              <VExpandTransition class="pa-5" >
                <div v-if="quizzesExpanded" :style="{backgroundColor: colors['background']}">
                        <VCard class="custom-card pa-4">
                            <VRow align="center">
                            <!-- عنوان التقييم -->
                            <VCol cols="12">
                                <h3 class="text-h6 font-weight-bold text-white">التقييم  1: :</h3>
                            </VCol>

                            <!-- الدرجة -->
                            <VCol cols="12"  class="d-flex align-center">
                                <span class="text-white text-caption font-weight-bold">15.0 /</span>
                                <span class="score">12</span>
                            </VCol>

                            <!-- التاريخ -->
                            <VCol class="d-flex" cols="6" md="3">
                                <VChip class="custom-chip">2024</VChip>
                                <VChip class="custom-chip">اخلاص</VChip>
                            </VCol>
                            </VRow>
                        </VCard>
                </div>
              </VExpandTransition>
            </VListItem>
            <VListItem class="pa-0 ">
                <div style="width: 100%;" :style="{backgroundColor: colors['on-primary']}">
                    <VBtn
                    color="none"
                    variant="text"
                    @click="togglelap"
                    class=""
                  >
                    <VListItemTitle :style="{ color: colors['background'] }"> العملي Lap</VListItemTitle>
                    <VIcon>{{ lapExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</VIcon>
                  </VBtn>
                </div>
              <VExpandTransition class="pa-5">
                <div v-if="lapExpanded" :style="{backgroundColor: colors['background']}">
                  <div v-for="(evaluation, index) in evaluations2" :key="index" class="mb-6">
                    <h3 :style="{color: colors['background'] }" class="text-h6">التقييم : {{ evaluation.id }}</h3>
                    <p :style="{color: colors['background'] }" class="text-h5">{{ evaluation.score }}</p>
                    <p :style="{color: colors['background'] }" v-for="(date, i) in evaluation.dates" :key="i" class="text-body-1">{{ date }}</p>
                  </div>
                </div>
              </VExpandTransition>
            </VListItem>
            <VListItem class="pa-0 ">
                <div style="width: 100%;" :style="{backgroundColor: colors['on-primary']}">
                    <VBtn
                    color="none"
                    variant="text"
                    @click="togglereports"
                    class=""
                  >
                    <VListItemTitle :style="{ color: colors['background'] }">واجبات بيتية Online Assignments</VListItemTitle>
                    <VIcon>{{ reportsExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</VIcon>
                  </VBtn>
                </div>
              <VExpandTransition class="pa-5">
                <div v-if="reportsExpanded" :style="{backgroundColor: colors['background']}">
                  <div v-for="(evaluation, index) in evaluations3" :key="index" class="mb-6">
                    <h3 :style="{color: colors['background'] }" class="text-h6">التقييم : {{ evaluation.id }}</h3>
                    <p :style="{color: colors['background'] }" class="text-h5">{{ evaluation.score }}</p>
                    <p :style="{color: colors['background'] }" v-for="(date, i) in evaluation.dates" :key="i" class="text-body-1">{{ date }}</p>
                  </div>
                </div>
              </VExpandTransition>
            </VListItem>
            <VListItem class="pa-0 ">
                <div style="width: 100%;" :style="{backgroundColor: colors['on-primary']}">
                    <VBtn
                    color="none"
                    variant="text"
                    @click="togglehw"
                    class=""
                  >
                    <VListItemTitle :style="{ color: colors['background'] }">التقارير Reports</VListItemTitle>
                    <VIcon>{{ hwExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</VIcon>
                  </VBtn>
                </div>
              <VExpandTransition class="pa-5">
                <div v-if="hwExpanded" :style="{backgroundColor: colors['background']}">
                  <div v-for="(evaluation, index) in evaluations3" :key="index" class="mb-6">
                    <h3 :style="{color: colors['background'] }" class="text-h6">التقييم : {{ evaluation.id }}</h3>
                    <p :style="{color: colors['background'] }" class="text-h5">{{ evaluation.score }}</p>
                    <p :style="{color: colors['background'] }" v-for="(date, i) in evaluation.dates" :key="i" class="text-body-1">{{ date }}</p>
                  </div>
                </div>
              </VExpandTransition>
            </VListItem>
          </VList>

          <VDivider class="my-4" :style="{ backgroundColor: colors['border-color'] }" />
          
          <VCard class="custom-card pa-4">
                            <VRow align="center">
                            <!-- عنوان التقييم -->
                            <VCol cols="12">
                                <h3 class="text-h6 font-weight-bold text-white">درجة نصف السنة</h3>
                            </VCol>

                            <!-- الدرجة -->
                            <VCol cols="12"  class="d-flex align-center">
                                <span class="text-white text-caption font-weight-bold">15.0 /</span>
                                <span class="score">12</span>
                            </VCol>
                            </VRow>
                        </VCard>

          <!-- عدد المركب -->
        </VCardText>
        <VCardActions :style="{ backgroundColor: colors.background }">
          <VSpacer />
          <VBtn 
            color="primary" 
            @click="closeDialog"
            :style="{ color: colors['on-primary'] }"
          >
            إغلاق
          </VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from 'vuetify';
const props = defineProps({
  modelValue: Boolean,
});
const global = useTheme()
const colors = computed(() => global.current.value.colors);
const quizzesExpanded = ref(false);
const toggleQuizzes = () => {
  quizzesExpanded.value = !quizzesExpanded.value;
};
const lapExpanded = ref(false);
const togglelap = () => {
  lapExpanded.value = !lapExpanded.value;
};
const reportsExpanded = ref(false);
const togglereports = () => {
  reportsExpanded.value = !reportsExpanded.value;
};
const hwExpanded = ref(false);
const togglehw = () => {
  hwExpanded.value = !hwExpanded.value;
};
const emit = defineEmits(['update:modelValue']);
const evaluations = ref([
  {
    id: 1,
    score: '12.0/15.0',
    dates: [
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن',
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن'
    ]
  },
]);

const evaluations2 = ref([
  {
    id: 1,
    score: '12.0/15.0',
    dates: [
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن',
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن'
    ]
  },
]);

const evaluations3 = ref([
  {
    id: 1,
    score: '12.0/15.0',
    dates: [
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن',
      'السبت: 14/2/2024 اخالص فالح نامر عبد الحسن'
    ]
  },
]);
const closeDialog = () => {
  emit('update:modelValue', false);
};
</script>