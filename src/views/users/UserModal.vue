<script setup lang="ts">
import { ref } from 'vue'
import { useSubmit } from '@/composables/useSubmit'
import {
    emailValidator,
    requiredValidator,
} from '@/constant/validations'
import { useBaseTableStore } from '@/stores/useBaseTableStore'
import { baseService } from '@/api/BaseService';

interface UserForm {
    name: string
    username: string
    email: string
    role: string
    permissions: string[]
    status: string
}

const form = ref<UserForm>({
    name: '',
    username: '',
    email: '',
    role: '',
    permissions: [],
    status: '',
})

const formRef = ref<InstanceType<typeof VForm> | null>(null)
const tableStore = useBaseTableStore()
const permissionOptions = ref([])

const { submit, loading } = useSubmit(
    { create: '/users/profile', update: '/users/profile' },
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
        name: '',
        username: '',
        email: '',
        role: '',
        permissions: [],
        status: '',
    }
}

onMounted(async () => {
    try {
        const response = await baseService.get('/permissionsList/')
        permissionOptions.value = response
    }
    catch (error) {
        console.error('Error fetching permissions:', error)
    }
})

watch(
    () => tableStore.dataEdit,
    newVal => {
        if (newVal)
            Object.assign(form.value, newVal.props.title) // Load data into the form when dialog opens
        else
            handleReset() // Reset the form when dialog closes
    },
    { deep: true, immediate: true },
)
</script>

<template>
    <VCardItem class="text-high-emphasis text-center pb-3">
        <h3 class="py-0">
            تحديث المستخدم
        </h3>
    </VCardItem>
    <VDivider />
    <VCardText>
        <VForm ref="formRef" class="pt-2" validate-on="submit blur" @submit.prevent="submitUpdate">
            <VRow>
                <VCol cols="12" md="6">
                    <label for="firstname">الاسم الاول</label>
                    <VTextField id="firstname" v-model="form.name" placeholder="ادخل الاسم الاول" :rules="[requiredValidator]" autocomplete="off" />
                </VCol>
                <VCol cols="12" md="6">
                    <label for="lastname">رقم الهاتف</label>
                    <VTextField id="lastname" v-model="form.username" placeholder="ادخل رقم الهاتف" :rules="[requiredValidator]" autocomplete="off" />
                </VCol>
            </VRow>
            <VRow>
                <VCol cols="12" md="6">
                    <label for="email">الايميل</label>
                    <VTextField id="email" v-model="form.email" placeholder="ادخل الايميل"
                        :rules="[requiredValidator, emailValidator]" autocomplete="off" />
                </VCol>
                <VCol cols="12" md="6">
                    <label for="role">الرتبة</label>
                    <VSelect id="role" v-model="form.role" :items="[
                        'Root',
                        'Admin',
                        'Student',
                        'Instructor',
                        'Company',
                    ]" :rules="[requiredValidator]" />
                </VCol>
            </VRow>
            <VRow>
                <VCol cols="12" md="6">
                    <label for="permission">الصلاحيات</label>
                    <VSelect id="permission" v-model="form.permissions" :items="permissionOptions" multiple :rules="[requiredValidator]" />
                </VCol>
                <VCol cols="12" md="6">
                    <label for="status">الحالة</label>
                    <VSelect id="status" v-model="form.status" :items="['Active', 'Inactive']" :rules="[requiredValidator]" />
                </VCol>
            </VRow>
            <VRow>
                <VCol cols="12" class="d-flex gap-4 justify-end">
                    <VBtn type="submit" :disabled="loading">
                        موافقة
                    </VBtn>
                    <VBtn variant="outlined" @click="tableStore.handleCloseDialog()">
                        اغلاق
                    </VBtn>
                </VCol>
            </VRow>
        </VForm>
    </VCardText>
</template>
