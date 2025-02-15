<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VBtn, VIcon } from 'vuetify/components'
import { Student, Header } from './type'
import EditStudentDialog from '../../views/student/base/baseDialog.vue'
import router from '@/router'

const headers: Header[] = [
  { title: 'الاسم الأول', key: 'first_name' },
  { title: 'الاسم الثاني', key: 'middle_name' },
  { title: 'الاسم الثالث', key: 'last_name' },
  { title: 'الاسم الرابع', key: 'nickname' },
  { title: 'المؤسسة', key: 'institution' },
  { title: 'الكلية', key: 'college' },
  { title: 'القسم', key: 'department' },
  { title: 'نوع الدراسة', key: 'study_type' },
  { title: 'المستوى', key: 'level' },
  { title: 'إجراءات', key: 'actions', sortable: false }
]

const items = ref<Student[]>([
  {
    id: 1,
    first_name: 'أحمد',
    middle_name: 'محمد',
    last_name: 'الزهراني',
    nickname: 'أبو علي',
    institution: 'جامعة الملك سعود',
    college: 'كلية الهندسة',
    department: 'قسم الميكانيكا',
    study_type: 'انتظام',
    level: 'المستوى الخامس',
  },
])

const deleteRow = (id: number) => {
  console.log('deleteRow', id)
  items.value = items.value.filter(item => item.id !== id)
}

const dialog = ref(false)
const editedStudent = ref<Student | null>(null)

const editRow = (student: Student) => {
  editedStudent.value = { ...student }
  dialog.value = true
}

const saveEdit = (updatedStudent: Student) => {
  if (!updatedStudent) return
  items.value = items.value.map(item => 
    item.id === updatedStudent.id ? { ...updatedStudent } : item
  )
  dialog.value = false
}

const addNewStudent = () => {
  router.push('/add-new-student')
}
</script>

<template>
  <div>
    <VBtn color="primary" block @click="addNewStudent()">إضافة طالب جديد</VBtn>
    <VDataTable class="mt-6" :headers="headers" :items="items" :items-per-page="5">
      <template #[`item.actions`]="{ item }">
        <VBtn icon size="x-small" color="red" variant="text" @click="deleteRow(item.raw.id)">
          <VIcon size="22" icon="tabler-trash" />
        </VBtn>
        <VBtn icon size="x-small" color="blue" variant="text" @click="editRow(item.raw)">
          <VIcon size="22" icon="tabler-edit" />
        </VBtn>
      </template>
    </VDataTable>

    <EditStudentDialog v-model="dialog" :student="editedStudent" @save="saveEdit" />
  </div>
</template>
