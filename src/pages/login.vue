<script setup lang="ts">
import type { VForm } from 'vuetify/components/VForm';
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant';
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png';
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png';
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png';
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png';
import authV2MaskDark from '@images/pages/misc-mask-dark.png';
import authV2MaskLight from '@images/pages/misc-mask-light.png';
import { VNodeRenderer } from '@layouts/components/VNodeRenderer';
import { themeConfig } from '@themeConfig';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
// import apiClient from '../Api/apiClient.js';
// import authServices from '../Api/authServices.js';
// import Cookies from 'js-cookie';

const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true
);
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark);
const isPasswordVisible = ref(false);

const refVForm = ref<VForm>();
const form = ref({
  email: '',
  password: '',
});

const router = useRouter();

const login = async () => {
  try {
    const response = await axios.post('http://foscsgks8cs48ssoowkgkg0c.194.163.168.91.sslip.io/api/Auth/login', {
      email: form.value.email,
      password: form.value.password,
    });

    // استخراج التوكن من الاستجابة
    const token = response.data.token;

    if (token) {
      console.log(token)
    } else {
      console.error('لم يتم استقبال التوكن!');
    }
  } catch (error) {
    console.error('خطأ في تسجيل الدخول:');
  }
};

</script>

<template>
  <VRow no-gutters class="auth-wrapper bg-surface">
    <VCol lg="8" class="d-none d-lg-flex">
      <div class="position-relative bg-background rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>

        <VImg :src="authThemeMask" class="auth-footer-mask" />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard flat :max-width="500" class="mt-12 mt-sm-0 pa-4">
        <VCardText>
          <VNodeRenderer :nodes="themeConfig.app.logo" class="mb-6" />

          <h5 class="text-h5 mb-1">
            مرحبا بك في
            <span class="text-capitalize"> {{ themeConfig.app.title }} </span>!
            👋🏻
          </h5>

          <p class="mb-0">الرجاء تسجيل الدخول للمتابعة 🚀</p>
        </VCardText>

        <VCardText>
          <VForm ref="refVForm" @submit.prevent="login">
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="form.email"
                  label="Email"
                  type="email"
                  placeholder="ادخل البريد الالكتروني"
                  autofocus
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="form.password"
                  label="Password"
                  placeholder="ادخل كلمة المرور"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div
                  class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4"
                >
                  <VCheckbox  label="Remember me" />
                </div>

                <VBtn block type="submit"> Login </VBtn>
              </VCol>

              <VCol cols="12" class="text-center">
                <span>الدخول ك استاذ</span>
                <router-link to="/teacherLogin">
                  <span class="text-primary ms-2">من هنا</span>
                </router-link>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use '@core/scss/template/pages/page-auth.scss';
</style>

<route lang="yaml">
meta:
  layout: blank
</route>