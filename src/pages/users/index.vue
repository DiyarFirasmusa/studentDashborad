<script setup lang="ts">
import { ref } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'
import { VBtn, VIcon } from 'vuetify/components'
import EditStudentDialog from '../../views/student/base/baseDialog.vue'
import router from '@/router'

interface User {
  id: number
  first_name: string
  address: string
  job: string
  email: string
  password: string
  rank: string
  permissions: string
  status: string
}

const headers = [
  { title: 'الاسم الأول', key: 'first_name' },
  { title: 'العنوان', key: 'address' },
  { title: 'الوظيفة', key: 'job' },
  { title: 'الإيميل', key: 'email' },
  { title: 'كلمة المرور', key: 'password' },
  { title: 'الرتبة', key: 'rank' },
  { title: 'الصلاحيات', key: 'permissions' },
  { title: 'الحالة', key: 'status' },
  { title: 'إجراءات', key: 'actions', sortable: false }
]

const users = ref<User[]>([
  {
    id: 1,
    first_name: 'أحمد',
    address: 'الرياض',
    job: 'مهندس برمجيات',
    email: 'ahmed@example.com',
    password: '********',
    rank: 'مدير',
    permissions: 'كامل',
    status: 'نشط'
  },
  {
    id: 2,
    first_name: 'سارة',
    address: 'جدة',
    job: 'مصممة UX',
    email: 'sara@example.com',
    password: '********',
    rank: 'مشرف',
    permissions: 'متوسط',
    status: 'غير نشط'
  },
  {
    id: 3,
    first_name: 'محمد',
    address: 'مكة',
    job: 'مطور ويب',
    email: 'mohammed@example.com',
    password: '********',
    rank: 'موظف',
    permissions: 'محدود',
    status: 'نشط'
  }
])

const deleteRow = (id: number) => {
  users.value = users.value.filter(user => user.id !== id)
}

const dialog = ref(false)
const editedUser = ref<User | null>(null)

const editRow = (user: User) => {
  editedUser.value = { ...user }
  dialog.value = true
}

const saveEdit = (updatedUser: User) => {
  if (!updatedUser) return
  users.value = users.value.map(user => 
    user.id === updatedUser.id ? { ...updatedUser } : user
  )
  dialog.value = false
}

const addNewUser = () => {
  router.push('/add-new-users')
}
</script>

<template>
  <div>
    <VBtn color="primary" block @click="addNewUser()">إضافة مستخدم جديد</VBtn>
    <VDataTable class="mt-6" :headers="headers" :items="users" :items-per-page="5">
      <template #[`item.actions`]="{ item }">
        <VBtn icon size="x-small" color="red" variant="text" @click="deleteRow(item.id)">
          <VIcon size="22" icon="tabler-trash" />
        </VBtn>
        <VBtn icon size="x-small" color="blue" variant="text" @click="editRow(item.raw)">
          <VIcon size="22" icon="tabler-edit" />
        </VBtn>
      </template>
    </VDataTable>

    <EditStudentDialog v-model="dialog" :student="editedUser" @save="saveEdit" />
  </div>
</template>
