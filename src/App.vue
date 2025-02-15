<script setup lang="ts">
import { useTheme } from 'vuetify'
import ScrollToTop from '@core/components/ScrollToTop.vue'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'
import BaseToast from '@/components/Base/BaseToast.vue'
import { useLocalstorage } from '@/composables/useLocalstorage'
const { syncInitialLoaderTheme, syncVuetifyThemeWithTheme: syncConfigThemeWithVuetifyTheme, isAppRtl, handleSkinChanges } = useThemeConfig()

const { global } = useTheme()

// const accessToken = useLocalstorage('accessToken')
// const userData = useLocalstorage('userData')
// // const router = useRouter()

// const logout = async () => {
//   // Remove "accessToken" from localStorage
//   localStorage.setItem('accessToken', '')

//   // Remove "userData" from localStorage
//   localStorage.setItem('userData', '')

//   await router.push("/login")
// }

// onMounted(() => {
//   if (!userData || !accessToken) logout()
// })


// ℹ️ Sync current theme with initial loader theme
syncInitialLoaderTheme()
syncConfigThemeWithVuetifyTheme()
handleSkinChanges()
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
    <!-- ℹ️ This is required to set the background color of active nav link based on currently active global theme's primary -->
    <VApp :style="`--v-global-theme-primary: ${hexToRgb(global.current.value.colors.primary)}`">
      <BaseToast />
      <RouterView />
      <ScrollToTop />
    </VApp>
  </VLocaleProvider>
</template>
