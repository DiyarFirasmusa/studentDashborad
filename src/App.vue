<script setup lang="ts">
import { useTheme } from 'vuetify'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'
import BaseToast from '@/components/Base/BaseToast.vue'
import { useLocalstorage } from '@/composables/useLocalstorage'
const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl, handleSkinChanges } = useThemeConfig()
import Cookies from 'js-cookie';
const { global } = useTheme()
const router = useRouter()

const logout = async () => {
  Cookies.remove('token');
  await router.push("/login");
};

onMounted(() => {
  const token = Cookies.get('token');
  if (!token) {
    logout();
  }
});
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <BaseToast />
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
