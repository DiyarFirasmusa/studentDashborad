<template>
  <div>
    <VCard class="mx-auto" min-width="400" :style="{ color: colors['on-background'] }">
      <VCardTitle class="pa-3 mb-6" color="primary" :style="{ backgroundColor: colors.primary, color: colors['on-secondary'] }">
        <span class="headline">بيانات الطالب</span>
      </VCardTitle>
      <VCardText>

        <VRow>
          <VCol cols="12">
            <div class="d-flex justify-center">
              <div class="d-flex justify-center" :style="{background:colors['primary']}" style="width: 170px; height: 170px; border-radius: 50%;">
              </div>
            </div>
          </VCol>
          <VCol  cols="12" class="text-center d-flex justify-center flex-column">
            <VCardTitle class="headline" :style="{ color: colors['on-surface'] }">مقتدى حسين كاظم الموسوي العباسي</VCardTitle>
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="3">
            <VTextField readonly label="الاسم الاول" value="الاسم الاول" variant="outlined" v-model="level" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
          <VCol cols="3">
            <VTextField readonly label="الاسم الثاني" value="الاسم الثاني" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
          <VCol cols="3">
            <VTextField readonly label="الاسم الثالث" value="الاسم الثالث" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
          <VCol cols="3">
            <VTextField readonly label="الاسم الرابع" value="الاسم الرابع" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
          <VCol cols="3">
            <VTextField readonly label="اللقب" value="اللقب" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
          <VCol cols="3">
            <VTextField readonly label="رقم الهاتف" value="رقم الهاتف" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="6">
            <VTextField readonly label="المؤسسة" value="بكالوريوس" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
          <VCol cols="6">
            <VTextField readonly label="الكلية" value="85%" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="6">
            <VTextField readonly label="القسم" value="2024" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
          <VCol cols="6">
            <VTextField readonly label="البرنامج الدراسي" value="120" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="6">
            <VTextField readonly label="نوع الدراسة" value="2024" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
          <VCol cols="6">
            <VTextField readonly label="المستوى" value="120" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
        </VRow>

        <VRow>
          <VCol cols="12">
            <VTextField readonly label="الشعب الدراسية" value="رياضيات، برمجة، شبكات" variant="outlined" persistent-placeholder persistent-hint class="custom-text-field" :style="{ color: colors['on-surface'] }" />
          </VCol>
        </VRow>

      </VCardText>
    </VCard>
  </div>
</template>
<script setup>
import { useTheme } from 'vuetify';
import { computed } from 'vue';
const { global } = useTheme();
const colors = computed(() => global.current.value.colors);
</script>
<style scoped>
.custom-text-field :deep(.v-label) {
  color: white !important;
  font-weight: bold;
}
.headline {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 16px;
}
</style>
