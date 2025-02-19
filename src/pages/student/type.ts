export interface Student {
    id: number
    firstName: string
    secondName: string
    thirdName: string
    lastName: string
    theTitle: string
    phoneNumber: number
    university: string
    collage: string
    department: string
    programStudy: string
    typeOfStudy: string
    level: string
    academicDivision: string
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