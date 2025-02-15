<script setup lang="ts">
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
const toasts = computed(() => toastStore.toasts)
const showSnackbar = ref(false)
const timerProgress = ref(0)
const timerInterval = ref<NodeJS.Timeout | null>(null)
const timeout = toastStore.timeout

function getIconForType(type: string) {
    switch (type) {
        case 'error':
            return 'tabler-exclamation-circle'
        case 'success':
            return 'tabler-circle-check'
        case 'warning':
            return 'tabler-alert-triangle'
        default:
            return 'tabler-exclamation-circle'
    }
}

function startTimer() {
    let remainingTime = timeout
    timerInterval.value = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerInterval.value!)
            hideSnackbar()
        }
        else {
            const progress = ((timeout - remainingTime) / timeout) * 100

            timerProgress.value = progress
            remainingTime -= 110
        }
    }, 100)
}

function stopTimer() {
    if (timerInterval.value) {
        clearInterval(timerInterval.value)
        timerInterval.value = null
    }
}

function restartTimer() {
    stopTimer()
    startTimer()
}

function hideSnackbar() {
    showSnackbar.value = false
    stopTimer()
    toasts.value.forEach(item => toastStore.removeToast(item.id))
}

watch(toasts, newToasts => {
    if (newToasts.length) {
        showSnackbar.value = true
        restartTimer()
    }
}, { deep: true })

onUnmounted(stopTimer)
</script>

<template>
    <div>
        <VSnackbar v-model="showSnackbar" :color="toastStore.toastType" transition="scale-transition"
            location="top start" :timeout="toastStore.timeout" @mouseenter="stopTimer" @mouseleave="restartTimer"
            @click="hideSnackbar">
            <template #actions>
                <VProgressCircular :rotate="360" :size="40" :width="4" :model-value="timerProgress"
                    color="deep-orange-lighten-2">
                    <VBtn variant="text" icon="tabler-x" color="white" @click="hideSnackbar" />
                </VProgressCircular>
            </template>
            <div class="d-flex gap-2 flex-row align-center">
                <VIcon :key="toastStore.toastType" :icon="getIconForType(toastStore.toastType)" />
                <span>{{ toastStore.toastType}}</span>
                <span>{{ toasts.length }}</span>
            </div>
            <ul class="px-3">
                <li v-for="item in toasts" :key="item.id">
                    <span v-html="item.message" />
                </li>
            </ul>
        </VSnackbar>
    </div>
</template>