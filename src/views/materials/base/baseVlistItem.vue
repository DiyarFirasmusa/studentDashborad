<template>
    <VListItem class="pa-0 " >
        <VBtn
            width="100%"
            color="none"
            variant="text"
            @click="toggleQuizzes"
            class="d-flex justify-start"
        >
            <VListItemTitle :style="{ color: colors['background'] }">{{ props.title }}</VListItemTitle>
            <VIcon>{{ quizzesExpanded ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</VIcon>
        </VBtn>
        <VExpandTransition class="pa-5" >
            <div v-if="quizzesExpanded" :style="{backgroundColor: colors['background']}">
                <VCard  class="custom-card pa-4"  >
                    <VRow align="center">
                    <VCol cols="12">
                        <h3 class="headline font-weight-bold text-white">التقييم : 1</h3>
                    </VCol>
                    <VCol cols="12"  class="d-flex align-center">
                        <span class="text-white text-caption font-weight-bold">15.0 / </span>
                        <span class="score">12</span>
                    </VCol>
                    <VCol class="d-flex" cols="6" md="3">
                        <VChip class="custom-chip">2024</VChip>
                        <VChip class="custom-chip">اخلاص</VChip>
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