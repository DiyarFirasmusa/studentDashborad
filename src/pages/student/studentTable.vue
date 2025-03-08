<script setup lang="ts">
import { ref, computed } from 'vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { VBtn, VIcon } from 'vuetify/components';
import type { Student, Header } from './type'; // تأكد من استيراد النوعين بشكل صحيح
import { useTheme } from 'vuetify/lib/framework.mjs';
const { global } = useTheme();
const colors = computed(() => global.current.value.colors);

const props = defineProps<{
  headers: Header[];
  students: Student[];
  page: number;
  itemsPerPage: number;
}>();

const emit = defineEmits(['edit', 'delete', 'page-change', 'items-per-page-change']);

const pageInternal = ref(props.page);
const itemsPerPageInternal = ref(props.itemsPerPage);

const changePage = (newPage: number) => {
  pageInternal.value = newPage;
  emit('page-change', newPage);
};

const changeItemsPerPage = (newSize: number) => {
  itemsPerPageInternal.value = newSize;
  pageInternal.value = 1; // إعادة الصفحة إلى 1 عند تغيير عدد العناصر
  emit('items-per-page-change', newSize);
};

const deleteRow = (id: number) => {
  emit('delete', id);
};

const editRow = (student: Student, id: string) => {
  emit('edit', student, id);
};
</script>

<template>
    <div>
        <VDataTable
            class="mt-6"
            :headers="props.headers"
            :items="props.students"
            :items-per-page="itemsPerPageInternal"
            :page="pageInternal"
            @update:page="changePage"
            @update:items-per-page="changeItemsPerPage"
        >
            <template #item.actions="{ item }">
            <VBtn icon size="x-small" color="red" variant="text" @click="deleteRow(item.raw.id)">
                <VIcon size="22" icon="tabler-trash" />
            </VBtn>
            <VBtn icon size="x-small" color="blue" variant="text" @click="editRow(item.raw, item.raw.id)">
                <VIcon size="22" icon="tabler-edit" />
            </VBtn>
            </template>
        </VDataTable>
    </div>
</template>