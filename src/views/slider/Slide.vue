<script setup lang="ts">
import { baseService } from '@/api/BaseService';
import { useSubmit } from '@/composables/useSubmit';
import { apiUrl } from '@/environments/network-helper';
import { useDelete } from '@/composables/useDelete';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader';

const data = ref([]);
const itemToDelete = ref<null | any>(null);
const showDeleteDialog = ref(false);
const showEditDialog = ref(false);
const itemToEdit = ref<null | any>(null);
const isLoading = ref(false);

const getData = async () => {
  isLoading.value = true;
  try {
    const response = await baseService.get('/slides');
    data.value = response.data;
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
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target?.result;
      if (arrayBuffer) {
        let binary = '';
        const bytes = new Uint8Array(arrayBuffer);
        bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
        itemToEdit.value.pic = binary;
      }
    };
    reader.readAsArrayBuffer(file);
  }
};

const confirmEdit = async () => {
  if (itemToEdit.value) {
    const formData = new FormData();
    formData.append('title', itemToEdit.value.title);
    formData.append('description', itemToEdit.value.description);
    formData.append('href', itemToEdit.value.href);
    if (itemToEdit.value.pic instanceof File) {
      formData.append('pic', itemToEdit.value.pic);
    }
    try {
      await baseService.updateById(`/slides`, itemToEdit.value.id, formData);
      getData();
    } catch (error) {
      console.error(error);
    }
  }
  showEditDialog.value = false;
};

const confirmDelete = async () => {
  if (itemToDelete.value) {
    const { deleteById } = useDelete(`/slides`);
    try {
      await deleteById(itemToDelete.value.id);
      getData();
    } catch (error) {
      console.error(error);
    }
  }
  showDeleteDialog.value = false;
};

onMounted(async () => {
  getData();
});
</script>
<template>
  <VRow>
    <v-col v-if="isLoading" cols="4" md="4" sm="6">
      <VSkeletonLoader
        class="mx-auto"
        max-width="500"
        height="400"
        type="image, article"
      ></VSkeletonLoader>
    </v-col>
    <VCol
      v-else
      v-for="(item, index) in data"
      :key="index"
      cols="4"
      md="4"
      sm="6"
    >
      <v-card class="mx-auto" max-width="350">
        <v-img
          class="align-end text-white"
          height="200"
          :src="`${apiUrl}/${item.pic}`"
          cover
        >
        </v-img>

        <v-card-subtitle class="pt-4"> {{ item.title }} </v-card-subtitle>

        <v-card-text>
          <div>{{ item.description }}</div>
        </v-card-text>

        <div class="pa-3 d-flex gap-4">
          <VBtn text="Edit" @click="openEditDialog(item.id)"></VBtn>

          <v-btn
            color="error"
            text="delete"
            @click="openDeleteDialog(item.id)"
          ></v-btn>
        </div>
      </v-card>
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
              <VBtn color="primary" @click="showDeleteDialog = false">
                كلا
              </VBtn>
              <VBtn color="primary" @click="confirmDelete"> نعم </VBtn>
            </div>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>

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
                      v-model="itemToEdit.title"
                      label="العنوان"
                    ></VTextField>
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="itemToEdit.description"
                      label="الوصف"
                    ></VTextField>
                  </VCol>
                  <VCol cols="12">
                    <VTextField
                      v-model="itemToEdit.href"
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
                <VBtn color="primary" @click="showEditDialog = false">
                  كلا
                </VBtn>
                <VBtn color="primary" @click="confirmEdit"> نعم </VBtn>
              </div>
            </form>
          </VCol>
        </VRow>
      </VCard>
    </VDialog>
  </VRow>
</template>
