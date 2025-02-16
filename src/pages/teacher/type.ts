export interface Teacher {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  nickname: string;
  institution: string;
  college: string;
  department: string;
  specialization: string; // التخصص
  academic_degree: string; // الدرجة العلمية (بكالوريوس، ماجستير، دكتوراه، إلخ)
}
  
  export interface Header {
    title: string
    key: string
    sortable?: boolean
  }
  
  export interface StudentForm {
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    institution: string;
    collegeName: string;
    departmentName: string;
    typeStudey: string;
    level: string;
  }