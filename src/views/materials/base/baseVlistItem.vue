<template>
    <VListItem class="pa-0 " >
        <div @click="toggleQuizzes" class="d-flex pa-4">
            <VListItemTitle style="font-weight: 500;"  :style="{ color: colors['grey-600'] }">{{ props.title }}</VListItemTitle>
            <VSpacer />
            <VIcon>{{ quizzesExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</VIcon>
        </div>
        <VExpandTransition class="pa-5" >
            <div v-if="quizzesExpanded" :style="{backgroundColor: colors['background']}">
                <VCard class="custom-card pa-3 no-background-with-border">
                    <VRow align="center">
                    <VCol cols="12">
                        <h3 :style="{color: colors['on-primary']}" class="headline font-weight-bold">التقييم  1:</h3>
                    </VCol>
                    <VCol cols="12" class="d-flex align-center">
                        <span style="font-size: 1.5rem;">15.0/</span>
                        <span class="">12.0</span>
                    </VCol>
                    <VCol class="d-flex " cols="12" >
                        <div class="custom-card card ml-4"><h1>w</h1></div>
                        <div class="custom-card card"><h1>2</h1></div>
                    </VCol>
                    </VRow>
                </VCard>
            </div>
        </VExpandTransition>
    </VListItem>
</template>

<script setup lang="ts">
    import { ref, computed } from 'vue';

    import { useTheme } from 'vuetify';
    const global = useTheme()
    const colors = computed(() => global.current.value.colors);

    const quizzesExpanded = ref(false);
    const toggleQuizzes = () => {
    quizzesExpanded.value = !quizzesExpanded.value;
    };

    const props = defineProps({
        title: String,
    })
</script>
<style>
.custom-card {
  background-color: transparent !important;
  border: 1px solid #ccc; /* يمكن تغيير اللون إلى اللون المطلوب */
  border-radius: 8px; /* لتحديد الحواف المدورة */
}

.no-background-with-border {
  background-color: transparent !important; /* إزالة الخلفية */
  border: 1px solid #ccc; /* إضافة الحدود */
}

.card {
    width: 150px;
}

</style>