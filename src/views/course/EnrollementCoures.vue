<script setup lang="ts">
import { baseService } from '@/api/BaseService';
import { useBaseTableStore } from '@/stores/useBaseTableStore'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

const props = defineProps<{
    data: any
}>()

const userDataEnrollements = ref([])
const tableStore = useBaseTableStore()
const isLoading = ref(false)
onMounted(() => {
    if (props.data.raw) {
        isLoading.value = true
        baseService.get(`/courses/${props.data.raw.id}`).then((res) => {
            
            userDataEnrollements.value = res.enrollments.map(enrollment => ({
                id: enrollment.id,
                name: enrollment.user.name,
                email: enrollment.user.email,
                status: enrollment.status
            }))
        }).finally(() => {
            isLoading.value = false
        })
    }
})

const acceptEnrollement = (id: any) => {
    baseService.updateById(`/enrollments/set-state`, id, { status: 'Approved' }).then(() => {
        userDataEnrollements.value = userDataEnrollements.value.map((enrollment: any) => {
            if (enrollment.id === id) {
                enrollment.status = 'Accepted'
            }
            return enrollment
        })
    })
}

const rejectEnrollement = (id: any) => {
    baseService.updateById(`/enrollments/set-state`, id, { status: 'Rejected' }).then(() => {
        userDataEnrollements.value = userDataEnrollements.value.map((enrollment: any) => {
            if (enrollment.id === id) {
                enrollment.status = 'Rejected'
            }
            return enrollment
        })
    })
}

</script>
<template>
    <div class="relative">
        <v-row class="pa-2">
            <VCardText>
                <v-card-title>الطلاب المسجلين</v-card-title>
            </VCardText>
        </v-row>
        <VDivider />
        <v-row class="pa-10">
            <VCol v-if="isLoading" cols="12" md="5">
                <VSkeletonLoader class="mx-auto" max-width="300" height="150" type="image" />
            </VCol>
            <v-col v-for="user in userDataEnrollements" cols="12" md="5">
                <v-card :subtitle="user.name" :title="user.email" class="pa-2 relative">
                    <v-chip color="primary" text-color="white">{{ user.status === "Pending" ? 'في الانتظار' : user.status === "Approved" ? 'تم القبول' : 'تم الرفض'
                        }}</v-chip>
                    <v-btn v-if="user.status !== 'Approved'" color="primary" class=" absoulte" @click="acceptEnrollement(user.id)">قبول</v-btn>
                    <v-btn v-else-if="user.status === 'Approved'" class=" absoulte" @click="rejectEnrollement(user.id)">الغاء القبول</v-btn>
                </v-card>
            </v-col>
        </v-row>
        <VBtn class="absoultes" variant="outlined" @click="tableStore.handleCloseDialog()">
            اغلاق
        </VBtn>
    </div>
</template>

<style scoped>
 
.relative {
    position: relative;
}
.absoulte {
    position: absolute;
    bottom: 0.5rem;
    left: 1rem;
}

.absoultes {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
}
</style>