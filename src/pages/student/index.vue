<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import type { Student, Header } from './type';
import EditStudentDialog from '../../views/student/base/baseDialog.vue';
import StudentTable from './studentTable.vue';
import AddStudentButton from './AddStudentButton.vue';

const router = useRouter();
const userType = Cookies.get('userType');

const headers: Header[] = [
  
  { title: 'الاسم الأول', key: 'firstName' },
  { title: 'الاسم الثاني', key: 'secondName' },
  { title: 'الاسم الثالث', key: 'thirdName' },
  { title: 'الاسم الرابع', key: 'lastName' },
  { title: 'اللقب', key: 'theTitle' },
  { title: 'رقم الهاتف', key: 'phoneNumber' },
  { title: 'المؤسسة', key: 'university' },
  { title: 'الكلية', key: 'collage' },
  { title: 'القسم', key: 'department' },
  { title: 'البرنامج الدراسي', key: 'programStudy' },
  { title: 'نوع الدراسة', key: 'typeOfStudy' },
  { title: 'المستوى', key: 'level' },
  { title: 'الشعب الدراسية', key: 'academicDivision' },
  { title: 'إجراءات', key: 'actions', sortable: false },
];

const items = ref<Student[]>([
  // ... (بيانات الطلاب)
  {
    id: 1,
    firstName: 'محمد',
    secondName: 'أحمد',
    thirdName: 'علي',
    lastName: 'الحسن',
    theTitle: 'طالب',
    phoneNumber: 123456789,
    university: 'جامعة بغداد',
    collage: 'الهندسة',
    department: 'الحاسبات',
    programStudy: 'بكالوريوس',
    typeOfStudy: 'صباحي',
    level: 'الثالث',
    academicDivision: 'أ',
  },
  {
    id: 2,
    firstName: 'فاطمة',
    secondName: 'محمود',
    thirdName: 'سالم',
    lastName: 'العبيدي',
    theTitle: 'طالبة',
    phoneNumber: 987654321,
    university: 'جامعة الموصل',
    collage: 'الطب',
    department: 'الجراحة',
    programStudy: 'بكالوريوس',
    typeOfStudy: 'مسائي',
    level: 'الرابع',
    academicDivision: 'ب',
  },
]);

const page = ref(1);
const itemsPerPage = ref(5);

const dialog = ref(false);
const editedStudent = ref<Student | null>(null);
const editId = ref('');

const addNewStudent = () => {
  router.push('/add-new-student');
};

const handleEdit = (student: Student, id: string) => {
  editedStudent.value = { ...student };
  editId.value = id;
  dialog.value = true;
};

const handleDelete = (id: number) => {
  items.value = items.value.filter((student) => student.id !== id);
};

const handlePageChange = (newPage: number) => {
  page.value = newPage;
};

const handleItemsPerPageChange = (newSize: number) => {
  itemsPerPage.value = newSize;
  page.value = 1;
};

const saveEdit = (updatedStudent: Student) => {
  if (!updatedStudent || editId.value === null) return;

  const index = items.value.findIndex((student) => student.id === updatedStudent.id);
  if (index !== -1) {
    items.value[index] = updatedStudent;
  }
  dialog.value = false;
};

onMounted(() => {
  if (Number(userType) !== 0) {
    router.push('/add-new-student');
  }
});
</script>

<template>
  <div>
    <AddStudentButton @click="addNewStudent" />

    <StudentTable
      :headers="headers"
      :students="items"
      :page="page"
      :items-per-page="itemsPerPage"
      @edit="handleEdit"
      @delete="handleDelete"
      @page-change="handlePageChange"
      @items-per-page-change="handleItemsPerPageChange"
    />

    <EditStudentDialog v-model="dialog" :student="editedStudent" @save="saveEdit" />
  </div>
</template>