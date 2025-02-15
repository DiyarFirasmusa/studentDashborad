export interface Lookup {
  id: string | null
  code?: string
  arName: string
  enName: string
  orderNo: number
  note?: string
  isActive?: boolean
  [index: string]: any
}

interface Instructor {
  id: string;
  name: string;
  bio: string;
  jobTitle: string;
  linkedIn: string;
  website: string;
  username: string;
  password: string;
  email: string;
  role: string;
  status: string;
  permissions: any[];
  createdAt: string;
  updatedAt: string;
}

interface Columns {
  title: string;
  description: string;
  numberLectures: number;
  place: string;
  startDate: string;
  status: string;
  actions: undefined;
}

interface Raw extends Columns {
  id: string;
  cover: string;
  duration: string;
  type: string;
  hasCertificate: boolean;
  lectures: any[];
  instructorId: string;
  userId: null;
  instructor: Instructor;
}

interface Props {
  title: string;
  value: string;
}

export interface Data {
  title: string;
  value: string;
  props: Props;
  children: undefined;
  raw: Raw;
  type: string;
  columns: Columns;
}