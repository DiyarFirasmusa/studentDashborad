<script lang="ts" setup>
import navItems from '@/navigation/vertical'
import { useThemeConfig } from '@core/composable/useThemeConfig'
// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'
const { appRouteTransition, isLessThanOverlayNavBreakpoint } = useThemeConfig()
const { width: windowWidth } = useWindowSize()
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          v-if="isLessThanOverlayNavBreakpoint(windowWidth)"
          id="vertical-nav-toggle-btn"
          class="ms-n3"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>

        <NavbarThemeSwitcher />

        <VSpacer />

        
        <VRow>
          <!-- جاري العمل -->
  <VCol cols="12" class="position-relative" style="height: 50px;">
    <div style="width: 100px; height: 20px; background-color: black; position: absolute; left: 20px; top: 10; display: flex; justify-content: center; align-items: center;">
      الاسبوع الخامس
    </div>
    <div style="width: 100px; height: 20px; background-color: black; position: absolute; left: 130px; top: 10; display: flex; justify-content: center; align-items: center;">
      الفصل الاول
    </div>
    <div style="width: 100px; height: 20px; background-color: black; position: absolute; left: 240px; top: 10; display: flex; justify-content: center; align-items: center; ">
      2025-2024
    </div>
  </VCol>
  <!-- <VCol cols="12">
    hi
  </VCol> -->
</VRow>

        <UserProfile />
      </div>
    </template>

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Transition
        :name="appRouteTransition"
        mode="out-in"
      >
        <Component :is="Component" />
      </Transition>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <!-- <TheCustomizer /> -->
  </VerticalNavLayout>
</template>
