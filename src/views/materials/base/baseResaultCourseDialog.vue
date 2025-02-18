<template>
    <div>
        <VDialog :model-value="modelValue"
         max-width="800" persistent >
      <VCard>
        <VCardTitle class="headline pa-4" :style="{ backgroundColor: colors.primary, color: colors['on-primary'] }">
          <span class="headline" :style="{color: colors['on-secondary']}">نتائج مقرر</span>
        </VCardTitle>
        <VCardText :style="{ backgroundColor: colors.background, color: colors['on-background'] }">
          <VList :style="{ color: colors['background'],backgroundColor: colors['grey-300'] }">
            <baseVlistItem title="الاختبارات َQuizzes"/>
            <baseVlistItem title="التقييمات Lab" />
            <baseVlistItem title="الواجبات Online assignments" />
            <baseVlistItem title="التقارير Reports" />
          </VList>

          <VDivider class="my-4" :style="{ backgroundColor: colors['border-color'] }" />
          
          <VCard class="custom-card pa-3 no-background-with-border">
                    <VRow align="center">
                    <VCol cols="12">
                        <h3 :style="{color: colors['on-primary']}" class="headline font-weight-bold" >درجة نصف السنة</h3>
                    </VCol>
                    <VCol cols="12" class="d-flex align-center">
                        <span style="font-size: 1.5rem;">15.0/</span>
                        <span class="">12.0</span>
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
<style>
  .headline {
    font-size: 1.3rem;
    font-weight: bold;
  }
</style>
