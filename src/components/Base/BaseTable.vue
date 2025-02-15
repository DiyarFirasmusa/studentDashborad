<script setup lang="ts">
import { baseService } from '@/api/BaseService';
import { useDelete } from '@/composables/useDelete';
import { useBaseTableStore } from '@/stores/useBaseTableStore';
import { computed, defineEmits, defineProps, onMounted, ref, watch } from 'vue';
import {
  VBtn,
  VCard,
  VCardText,
  VDialog,
  VDivider,
  VIcon,
  VPagination,
  VProgressLinear,
  VSelect,
} from 'vuetify/components';
import { VDataTable } from 'vuetify/labs/VDataTable';
import axiosIns from '@/plugins/axios'

interface Props {
  columns: {
    key: string;
    title: string;
  }[];
  url: string;
  params?: string;
  permissions: {
    canUpdate: any;
    canDelete: any;
  };
  dialogUpdate: boolean;
  deleteUrl: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['changePagination', 'changeSortBy', 'editRow']);
const sortBy = ref<{ key: string; order: string }[]>([]);
const ShowCreateDialog = ref(false);
const showEditDialog = ref(false);
const slot = useSlots();
const hasSlot = (name: string) => !!slot[name];
const data = ref([]);
const loading = ref(false);
const showDeleteDialog = ref(false);
const itemToDelete = ref<null | any>(null);

const options = ref({
  page: 1,
  limit: 10,
  totalCount: 0,
  pageCount: 1,
});

const tableStore = useBaseTableStore();

const getData = () => {
  loading.value = true;
  if(props.params){
      axiosIns.get(`${props.url}${props.params}skip=${(options.value.page - 1) * options.value.limit}&take=${options.value.limit}`)
      .then((res) => {
        data.value = res.data.data;
        options.value.totalCount = res.data.total;
        options.value.pageCount = Math.ceil(res.data.total / options.value.limit);
      })
      .finally(() => {
        loading.value = false;
      });
  }else {
  baseService
    .getList(
      `${props.url}?skip=${
        (options.value.page - 1) * options.value.limit
      }&take=${options.value.limit}`
    )
    .then((res) => {
      data.value = res.data;
      options.value.totalCount = res.total;
      options.value.pageCount = Math.ceil(res.total / options.value.limit);
    })
    .finally(() => {
      loading.value = false;
    });
  }
};

const paginationLength = computed(() => {
  return Math.ceil(options.value.totalCount / options.value.limit);
});

const paginationData = computed(() => {
  const firstIndex =
    data.value && data.value.length
      ? (options.value.page - 1) * options.value.limit + 1
      : 0;

  const lastIndex =
    data.value && data.value.length
      ? Math.min(
          options.value.page * options.value.limit,
          options.value.totalCount
        )
      : 0;

  return `Showing ${firstIndex} to ${lastIndex} of ${options.value.totalCount} entries`;
});

const editRow = (rowData: any) => {
  emit('editRow', rowData);
  if (hasSlot('edit')) {
    tableStore.dataEdit = rowData;
    showEditDialog.value = true;
  }
};

const openDeleteDialog = (item: any) => {
  itemToDelete.value = item;
  showDeleteDialog.value = true;
};

const confirmDelete = async () => {
  if (itemToDelete.value) {
    const { deleteById } = useDelete(props.deleteUrl);

    await deleteById(itemToDelete.value.value);
    getData();
  }
  showDeleteDialog.value = false;
};

const cancelDelete = () => {
  showDeleteDialog.value = false;
  itemToDelete.value = null;
};

onMounted(() => {
  getData();
});

watch(
  () => options.value.page,
  (page) => {
    emit('changePagination', page);
    getData();
  }
);

watch(
  () => options.value.limit,
  (v) => {
    getData();
  }
);

watch(data, (newValue) => {
  if (!Array.isArray(newValue))
    console.error('Expected data to be an array, but got:', newValue);
});


watch(sortBy, ([firstSort]) => {
  const { key = '', order = '' } = firstSort || {};

  emit('changeSortBy', { key, order });
});

watch(
  () => tableStore.refreshData,
  (v) => {
    getData();
    showEditDialog.value = false;
    ShowCreateDialog.value = false;
  }
);

watch(
  () => tableStore.closeDialog,
  (v) => {
    showEditDialog.value = false;
    ShowCreateDialog.value = false;
  }
);

const columnswithoutactions = computed(() => {
  return props.columns.filter((column) => column.key !== 'actions');
});

function removeTrailingZeros(dateString: string): string {
  // Split the date string by 'T' to separate date and time
  let [datePart] = dateString.split('T');

  // Return the date part
  return datePart;
}

</script>

<template>
  <section>
    <VCardText>
      <VRow>
        <div v-if="hasSlot('create')" class="ma-2">
          <VBtn @click="ShowCreateDialog = true"> Add New </VBtn>
        </div>
      </VRow>
    </VCardText>
    <VProgressLinear :active="loading" indeterminate rounded color="primary" height="6" />
    <VDataTable v-model:sort-by="sortBy" :headers="props.columns" :items="data" class="elevation-1"
      :items-per-page="options.limit">
      <template #bottom>
        <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-3 px-5">
          <span class="text-sm text-disabled">
            {{ paginationData }}
            <VSelect v-model="options.limit" :items="[10, 25, 50]" />
          </span>
          <VPagination v-model="options.page" :length="paginationLength" size="small" :total-visible="5" />
        </VCardText>
      </template>

      <template #[`item.startDate`]="{ item }">
        {{ removeTrailingZeros(item.raw.startDate) }}
      </template>

      <!-- <template v-for="h in columnswithoutactions" #[`item.${h.key}`]="{ item, index }" :key="h.key">
                <slot v-if="hasSlot(`item.${h.key}`)" :name="`item.${h.key}`" :item="item" :index="index" />
                <span v-else>
                    {{ item.props.title[h.key] }}
                </span>
            </template> -->

      <template #[`item.actions`]="{ item }">
        <VBtn icon size="x-small" color="default" variant="text" @click="editRow(item)">
          <VIcon size="22" icon="tabler-edit" />
        </VBtn>
        <VBtn icon size="x-small" color="default" variant="text" @click="openDeleteDialog(item)">
          <VIcon size="22" icon="tabler-trash" />
        </VBtn>
      </template>

    </VDataTable>
    <VDivider />

    <!-- Delete Confirmation Dialog -->
    <VDialog v-model="showDeleteDialog" max-width="500px">
      <VCard>
        <VCardText>
          <h4>هل انت متأكد من رغبتك في حذف العنصر</h4>
        </VCardText>
        <VRow>
          <VCol>
            <div class="d-flex gap-2 pa-3">
              <VBtn color="primary" @click="cancelDelete"> كلا </VBtn>
              <VBtn color="primary" @click="confirmDelete"> نعم </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>

    <VDialog v-model="showEditDialog" persistent max-width="800px">
      <VCard>
        <slot name="edit" />
      </VCard>
    </VDialog>

    <VDialog v-model="ShowCreateDialog" persistent max-width="800px">
      <VCard>
        <slot name="create" />
      </VCard>
    </VDialog>
  </section>
</template>
