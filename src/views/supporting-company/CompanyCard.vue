<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { baseService } from '@/api/BaseService';
import { useDelete } from '@/composables/useDelete';
import { apiUrl } from '@/environments/network-helper';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';
import axios from 'axios';
import { useAlert } from '@/composables/useAlerts';

const data = ref([]);
const itemToDelete = ref<null | any>(null);
const showDeleteDialog = ref(false);
const showEditDialog = ref(false);
const itemToEdit = ref<null | any>(null);
const isLoading = ref(false);

const getData = async () => {
  isLoading.value = true;
  try {
    const response = await baseService.get('/sponsers');
    data.value = response;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const openEditDialog = (id: string) => {
  itemToEdit.value = data.value.find((item: any) => item.id === id);
  showEditDialog.value = true;
};

const openDeleteDialog = (id: string) => {
  itemToDelete.value = data.value.find((item: any) => item.id === id);
  showDeleteDialog.value = true;
};

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  itemToEdit.value.pic = file;
};

const confirmEdit = async () => {
  showEditDialog.value = false;
  if (itemToEdit.value) {
    try {
      const formData = new FormData();
      formData.append('name', itemToEdit.value.name);
      formData.append('link', itemToEdit.value.link);
      if (itemToEdit.value.pic instanceof File) {
        formData.append('pic', itemToEdit.value.pic);
      }
      axios
        .patch(
          `https://warith.freelance.omnia.sh/sponsers/${itemToEdit.value.id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage
                .getItem('accessToken')
                ?.replace(/"/g, '')}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .finally(() => {
          useAlert('success', 'تم اضافة شركة داعمة بنجاح');
          getData();
        });
    } catch (error) {
      console.error(error);
    }
  }
};

const confirmDelete = async () => {
  if (itemToDelete.value) {
    const { deleteById } = useDelete(`/sponsers`);
    try {
      await deleteById(itemToDelete.value.id);
      getData();
    } catch (error) {
      console.error(error);
    }
  }
  showDeleteDialog.value = false;
};

onMounted(() => {
  getData();
});
</script>

<template>
  <VRow>
    <VCol v-if="isLoading" cols="4" md="4" sm="6">
      <VSkeletonLoader
        class="mx-auto"
        max-width="500"
        height="400"
        type="image, article"
      ></VSkeletonLoader>
    </VCol>
    <VCol
      v-else
      v-for="(item, index) in data"
      :key="index"
      cols="4"
      md="4"
      sm="6"
    >
      <VCard class="mx-auto" max-width="350">
        <VImg
          class="align-end text-white"
          height="200"
          :src="`${apiUrl}/${item.pic}`"
          cover
        ></VImg>
        <VCardSubtitle class="pt-4">{{ item.name }}</VCardSubtitle>
        <div class="pa-3 d-flex gap-4">
          <VBtn text @click="openEditDialog(item.id)">Edit</VBtn>
          <VBtn color="error" text @click="openDeleteDialog(item.id)"
            >Delete</VBtn
          >
        </div>
      </VCard>
    </VCol>

    <!-- Delete Confirmation Dialog -->
    <VDialog v-model="showDeleteDialog" max-width="500px">
      <VCard>
        <VCardText>
          <h4>هل انت متأكد من رغبتك في حذف العنصر</h4>
        </VCardText>
        <VRow>
          <VCol>
            <div class="d-flex gap-2 pa-3">
              <VBtn color="primary" @click="showDeleteDialog = false">كلا</VBtn>
              <VBtn color="primary" @click="confirmDelete">نعم</VBtn>
            </div>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>

    <!-- Edit Dialog -->
    <VDialog v-model="showEditDialog" max-width="600px">
      <VCard>
        <VCardText>
          <h4>تعديل السلايدر</h4>
        </VCardText>
        <VRow>
          <VCol>
            <form>
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <VTextField
                      v-model="itemToEdit.name"
                      label="العنوان"
                    ></VTextField>
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="itemToEdit.link"
                      label="الرابط"
                    ></VTextField>
                  </VCol>
                  <VCol cols="12">
                    <div>
                      <VImg
                        v-if="itemToEdit.pic"
                        :src="`${apiUrl}/${itemToEdit.pic}`"
                        alt="Current Image"
                      ></VImg>
                      <img v-else :src="itemToEdit.pic" alt="Current Image" />
                    </div>
                  </VCol>
                  <VCol cols="12">
                    <VFileInput
                      @change="onFileChange"
                      label="تحديث الصورة"
                    ></VFileInput>
                  </VCol>
                </VRow>
              </VCardText>
              <div class="d-flex gap-2 pa-3">
                <VBtn color="primary" @click="showEditDialog = false">كلا</VBtn>
                <VBtn color="primary" @click="confirmEdit">نعم</VBtn>
              </div>
            </form>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>
  </VRow>
</template>
