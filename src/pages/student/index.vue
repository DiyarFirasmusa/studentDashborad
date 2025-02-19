<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VBtn, VIcon } from 'vuetify/components'
import { Student, Header } from './type'
import EditStudentDialog from '../../views/student/base/baseDialog.vue'
import router from '@/router'
import { useTheme } from 'vuetify/lib/framework.mjs'
const { global } = useTheme();
const colors = computed(() => global.current.value.colors);
import apiClient from '../../Api/apiClient.js'

const headers: Header[] = [
  { title: 'الاسم الأول', key: 'firstName' },
  { title: 'الاسم الثاني', key: 'secondName' },
  { title: 'الاسم الثالث', key: 'thirdName' },
  { title: 'الاسم الرابع', key: 'lastName' },
  { title: 'اللقب' , key: 'theTitle'},
  { title: 'رقم الهاتف' , key: 'phoneNumber'},
  { title: 'المؤسسة', key: 'university' },
  { title: 'الكلية', key: 'collage' },
  { title: 'القسم', key: 'department' },
  { title: 'البرنامج الدراسي' , key: 'programStudy'},
  { title: 'نوع الدراسة', key: 'typeOfStudy' },
  { title: 'المستوى', key: 'level' },
  { title: 'الشعب الدراسية', key: 'academicDivision'},
  { title: 'إجراءات', key: 'actions', sortable: false }
]

import { AxiosError } from "axios";

const items = ref<Student[]>([])
const page = ref(1) // الصفحة الحالية
const itemsPerPage = ref(5) // عدد العناصر لكل صفحة

const fetchStudents = async () => {
  try {
    const response = await apiClient.get(`/students`, {
      params: {
        pageNumber: page.value,
        pageSize: itemsPerPage.value,
      }
    });

    items.value = response.data.students.map((student: any) => {
      const formattedStudent = {
        id: student.id,
        firstName: student.profile?.firstName || "غير متوفر",
        secondName: student.profile?.secondName || "غير متوفر",
        thirdName: student.profile?.thirdName || "غير متوفر",
        lastName: student.profile?.lastName || "غير متوفر",
        theTitle: student.profile?.theTitle || "غير متوفر",
        phoneNumber: parseInt(student.profile && student.profile.phoneNumber || "0", 10),
        university: student.profile?.university || "غير متوفر",
        collage: student.profile?.collage || "غير متوفر",
        department: student.profile?.department || "غير متوفر",
        programStudy: student.profile?.programStudy || "غير متوفر",
        typeOfStudy: student.profile?.typeOfStudy || "غير متوفر",
        level: student.profile?.level || "غير متوفر",
        academicDivision: student.profile?.academicDivision || "غير متوفر"
      };
      return formattedStudent;
    });

    console.log('تم جلب البيانات بنجاح');
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

// تغيير الصفحة عند التبديل
const changePage = (newPage: number) => {
  page.value = newPage;
  fetchStudents(); // جلب البيانات للصفحة الجديدة
};

// تغيير عدد العناصر لكل صفحة
const changeItemsPerPage = (newSize: number) => {
  itemsPerPage.value = newSize;
  fetchStudents(); // جلب البيانات بالحجم الجديد
};

const deleteRow = async (id: number) => {
  try {
    console.log('حذف الطالب:', id);
    await apiClient.delete(`/students/${id}`);
    fetchStudents() // إعادة جلب البيانات بعد الحذف
    console.log('تم حذف الطالب بنجاح');
  } catch (error) {
    console.error('خطأ أثناء حذف الطالب:', error);
  }
};

const dialog = ref(false)
const editedStudent = ref<Student | null>(null)
const editId = ref(""); // تعريف editId لتخزين المعرف أثناء التعديل

const editRow = (student: Student, id: string) => {
  editedStudent.value = { ...student };
  editId.value = id; // تخزين معرف الطالب الذي يتم تعديله
  dialog.value = true;
};

const saveEdit = async (updatedStudent: Student) => {
  if (!updatedStudent || editId.value === null) return;

  try {
    const { id, ...studentData } = updatedStudent;

    const formData = new FormData();
    formData.append("firstName", updatedStudent.firstName?.trim() || "");
    formData.append("secondName", updatedStudent.secondName?.trim() || "");
    formData.append("thirdName", updatedStudent.thirdName?.trim() || "");
    formData.append("lastName", updatedStudent.lastName?.trim() || "");
    formData.append("theTitle", updatedStudent.theTitle?.trim() || "");
    formData.append("phoneNumber", updatedStudent.phoneNumber ? String(updatedStudent.phoneNumber) : "0");
    formData.append("university", updatedStudent.university?.trim() || "");
    formData.append("collage", updatedStudent.collage?.trim() || "");
    formData.append("department", updatedStudent.department?.trim() || "");
    formData.append("programStudy", updatedStudent.programStudy?.trim() || "");
    formData.append("typeOfStudy", updatedStudent.typeOfStudy?.trim() || "");
    formData.append("level", updatedStudent.level?.trim() || "");
    formData.append("academicDivision", updatedStudent.academicDivision?.trim() || "");

    const response = await apiClient.put(
      `/students/${String(editId.value)}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    dialog.value = false;
    fetchStudents();
  } catch (error) {
    console.error("❌ خطأ أثناء تعديل الطالب:", error);
  }
};

const addNewStudent = () => {
  router.push('/add-new-student')
}

onMounted(fetchStudents)
</script>


<template>
  <div>
    <VBtn color="primary" block @click="addNewStudent()">
      <span class="headline" :style="{ color: colors['on-secondary'] }">اضافة طالب جديد</span>
    </VBtn>

    <VDataTable
      class="mt-6"
      :headers="headers"
      :items="items"
      :items-per-page="itemsPerPage"
      :page="page"
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

    <EditStudentDialog v-model="dialog" :student="editedStudent" @save="saveEdit" />
  </div>
</template>


<style>
.headline {
  font-size: 1.3rem;
  font-weight: bold;
}
</style>
