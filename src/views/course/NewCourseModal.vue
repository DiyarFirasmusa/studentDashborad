<script setup lang="ts">
import { ref } from 'vue'
import { useSubmit } from '@/composables/useSubmit'
import {
    requiredValidator,
} from '@/constant/validations'
import { useBaseTableStore } from '@/stores/useBaseTableStore'
import { baseService } from '@/api/BaseService';
import axiosIns from '@/plugins/axios'


const formRef = ref<InstanceType<typeof VForm> | null>(null)
const tableStore = useBaseTableStore()
const setate = ref('')
const id = ref('')
const { submit, loading } = useSubmit(
    { create: '/courses/update', update: '/courses/update' },
    async () => {
        if (formRef.value) {
            const { valid } = await formRef.value.validate()

            return valid
        }

        return false
    },
)

const submitUpdate = async () => {
    axiosIns
        .patch(`/enrollments/set-state/${id.value}​`, { status:setate.value})
    tableStore.refreshTable()
}



watch(
    () => tableStore.dataEdit,
    newVal => {
        if (newVal) {
            baseService.get(`/courses/${newVal.raw.id}`)
                .then((res) => {
                    console.log(res);
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                    console.log('done');
                });
        }
    },
    { deep: true, immediate: true },
)
</script>

<template>
    <VCardItem class="text-high-emphasis text-center pb-3">
        <h3 class="py-0">
            Update Course
        </h3>
    </VCardItem>
    <VDivider />
    <VCardText>
        <VForm ref="formRef" class="pt-2" validate-on="submit blur" @submit.prevent="submitUpdate">
            <VRow>
                <VCol cols="12" md="12">
                   <VSelect
                        v-model="setate"
                        :items="['Approved', 'Rejected']"
                        label="الحالة"
                        :rules=[requiredValidator]
                    />
                </VCol>
            </VRow>
            <VRow>
                <VCol cols="12" class="d-flex gap-4 justify-end">
                    <VBtn type="submit" :disabled="loading">
                        اضافة
                    </VBtn>
                    <VBtn variant="outlined" @click="tableStore.handleCloseDialog()">
                        إلغاء
                    </VBtn>
                </VCol>
            </VRow>
        </VForm>
    </VCardText>
</template>
