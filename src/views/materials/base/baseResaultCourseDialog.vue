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
            <baseVlistItem title="الاختبارات"/>
            <baseVlistItem title="التقييمات" />
            <baseVlistItem title="الواجبات" />
            <baseVlistItem title="التقارير" />
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
import baseVlistItem from './baseVlistItem.vue';

import { ref } from 'vue'
const props = defineProps({
    modelValue: Boolean,
});
import { useTheme } from 'vuetify';
const global = useTheme()
const colors = computed(() => global.current.value.colors);

const emit = defineEmits(['update:modelValue']);

const closeDialog = () => {
  emit('update:modelValue', false);
};
</script>

