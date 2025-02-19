<script setup lang="ts">
import { ref } from 'vue'
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


const items = ref<Student[]>([
  
])

const fetchStudents = async () => {
  try {
    const response = await apiClient.get(`/students`, {
      params: {
        pageNumber: 1,
        pageSize: 10,
      }
    });
    console.log(response.data.students)
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

    console.log('true')
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

const deleteRow = async (id: number) => {
  try {
    console.log('حذف الطالب:', id);

    // إرسال طلب DELETE إلى الـ API
    await apiClient.delete(`/students/${id}`);

    // تحديث القائمة بعد الحذف
    fetchStudents()
    
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

    const expectedData = {
      firstName: updatedStudent.firstName?.trim() || "",
      secondName: updatedStudent.secondName?.trim() || "",
      thirdName: updatedStudent.thirdName?.trim() || "",
      lastName: updatedStudent.lastName?.trim() || "",
      theTitle: updatedStudent.theTitle?.trim() || "",
      phoneNumber: updatedStudent.phoneNumber ? Number(updatedStudent.phoneNumber) : 0, // التأكد من صحة الرقم
      university: updatedStudent.university?.trim() || "",
      collage: updatedStudent.collage?.trim() || "",
      department: updatedStudent.department?.trim() || "",
      programStudy: updatedStudent.programStudy?.trim() || "",
      typeOfStudy: updatedStudent.typeOfStudy?.trim() || "",
      level: updatedStudent.level?.trim() || "",
      academicDivision: updatedStudent.academicDivision?.trim() || "",
    };

    console.log("📌 البيانات النهائية قبل الإرسال:", JSON.stringify(expectedData, null, 2));

    // إرسال الطلب مع التحقق من Headers
    const response = await apiClient.put(
      `/students/${String(editId.value)}`,
      expectedData,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("✅ تم تعديل الطالب بنجاح!");
    dialog.value = false;
    
  } catch (error) {
  console.error("❌ خطأ أثناء تعديل الطالب:", error);

  if (error instanceof AxiosError) {
    console.error("🔹 استجابة السيرفر:", error.response);
    console.error("🔹 كود الخطأ:", error.response?.status);
    console.error("🔹 نص الخطأ:", error.response?.statusText);
    console.error("🔹 تفاصيل الخطأ:", error.response?.data);
  } else {
    console.error("❗ خطأ غير متوقع:", error);
  }
}

};




const addNewStudent = () => {
  router.push('/add-new-student')
}

onMounted(fetchStudents)
</script>

<template>
  <div>
    <VBtn  color="primary" block @click="addNewStudent()"><span class="headline" :style="{color: colors['on-secondary']}">اضافة طالب جديد</span></VBtn>
    <VDataTable class="mt-6" :headers="headers" :items="items" :items-per-page="5" >
      <template #[`item.actions`]="{ item }" >
        <VBtn icon size="x-small" color="red" variant="text" @click="deleteRow(item.raw.id)">
          <VIcon size="22" icon="tabler-trash" />
        </VBtn>
        <VBtn icon size="x-small" color="blue" variant="text" @click="editRow(item.raw,item.raw.id)">
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
