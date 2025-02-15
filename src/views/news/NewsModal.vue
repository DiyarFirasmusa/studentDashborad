<script setup lang="ts">
import { ref } from 'vue'
import { useSubmit } from '@/composables/useSubmit'
import {
    emailValidator,
    requiredValidator,
} from '@/constant/validations'
import { useBaseTableStore } from '@/stores/useBaseTableStore'

interface UserForm {
    title: string
    content: string
    description: string
}

const form = ref<UserForm>({
    title: '',
    content: '',
    description: '',
})

const formRef = ref<InstanceType<typeof VForm> | null>(null)
const tableStore = useBaseTableStore()

const { submit, loading } = useSubmit(
    { create: '/posts/update', update: '/posts/update' },
    async () => {
        if (formRef.value) {
            const { valid } = await formRef.value.validate()
            return valid
        }

        return false
    },
)

const submitUpdate = async () => {
    await submit(tableStore.dataEdit?.value, form.value)
    tableStore.refreshTable()
}

const handleReset = () => {
    form.value = {
        title: '',
        content: '',
        description: '',
    }
}

watch(
    () => tableStore.dataEdit,
    newVal => {
        if (newVal)
            Object.assign(form.value, newVal?.columns) // Load data into the form when dialog opens
        else
            handleReset() // Reset the form when dialog closes
    },
    { deep: true, immediate: true },
)
</script>

<template>
    <VCardItem class="text-high-emphasis text-center pb-3">
        <h3 class="py-0">
            تحديث الخبر
        </h3>
    </VCardItem>
    <VDivider />
    <VCardText>
        <VForm ref="formRef" class="pt-2" validate-on="submit blur" @submit.prevent="submitUpdate">
            <VRow>
                <VCol cols="12" md="6">
                    <label for="firstname">العنوان</label>
                    <VTextField id="firstname" v-model="form.title" placeholder="ادخل العنوان"
                        :rules="[requiredValidator]" autocomplete="off" />
                </VCol>
                <VCol cols="12" md="6">
                    <label for="lastname">المحتوى</label>
                    <VTextField id="lastname" v-model="form.content" placeholder="ادخل المحتوى"
                        :rules="[requiredValidator]" autocomplete="off" />
                </VCol>
            </VRow>
            <VRow>
                <VCol cols="12" md="12">
                    <label for="email">الوصف</label>
                    <VTextarea id="email" v-model="form.description" placeholder="ادخل الوصف"
                        :rules="[requiredValidator]" autocomplete="off" />
                </VCol>
            </VRow>
            <VRow>
                <VCol cols="12" class="d-flex gap-4 justify-end">
                    <VBtn type="submit" :disabled="loading">
                        حفظ
                    </VBtn>
                    <VBtn variant="outlined" @click="tableStore.handleCloseDialog()">
                        إلغاء
                    </VBtn>
                </VCol>
            </VRow>
        </VForm>
    </VCardText>
</template>
