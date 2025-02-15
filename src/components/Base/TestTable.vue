<script setup lang="ts">
import { defineProps } from 'vue'
import { useDelete } from '@/composables/useDelete'
import { useGetList } from '@/composables/useGetList'

interface Props {
    columns: any[]
    rowPerPage: number
    url: string
    premissions: {
        canUpdate: any
        canDelete: any
    }
}

const props = defineProps<Props>()
const emit = defineEmits(['changePagination', 'editRow', 'deleteRow', 'changeSortBy'])
const currentPage = ref(1)
const sortBy = ref<{ key: string; order: string }[]>([])
const { data, fetch, loading, totalCount } = useGetList(props.url, { start: currentPage.value, limit: 10}) 


watch(currentPage, page => emit('changePagination', page))

// 👉 Computing pagination data
const paginationData = computed(() => {
    const firstIndex = data.value.length ? ((currentPage.value - 1) * 10) + 1 : 0
    const lastIndex = data.value.length + ((currentPage.value - 1) * 10)

    return `Showing ${firstIndex} to ${lastIndex} of ${totalCount.value} entries`
})

const editRow = (id: string | number) => {
    emit('editRow', id)
}

const deleteRow = async (id: string | number) => {
    emit('deleteRow', id)
    const { deleteById } = useDelete(props.url)
    await deleteById(id)
}

onMounted(() => {
    fetch()
})

// you can implment multi sort
// using the multi-sort prop will enable you to sort on multiple columns at the same time.
watch(sortBy, ([firstSort]) => {
    const { key = '', order = '' } = firstSort || {}

    emit('changeSortBy', { key, order })
})
</script>

<template>
    <section>
        <VDataTable v-model:sort-by="sortBy" :headers="columns" :items="data" class="elevation-1"
            :items-per-page="10">
            <template #bottom>
                <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
                    <span class="text-sm text-disabled">
                        {{ paginationData }}
                    </span>

                    <VPagination v-model="currentPage" size="small" :total-visible="5" :length="totalCount" />
                </VCardText>
            </template>

            <template #[`item.actions`]="{ item }">
                <VBtn icon size="x-small" color="default" variant="text" @click="editRow(item.raw?.id)">
                    <VIcon size="22" icon="tabler-edit" />
                </VBtn>

                <VBtn icon size="x-small" color="default" variant="text" @click="deleteRow(item.raw?.id)">
                    <VIcon size="22" icon="tabler-trash" />
                </VBtn>
            </template>
        </VDataTable>

        <VDivider />
    </section>
</template>
