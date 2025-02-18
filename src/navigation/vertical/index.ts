import type { HorizontalNavItems } from '@layouts/types';

export default [
  {
    title: 'الطلاب',
    to: { name: 'student' },
    icon: { icon: 'tabler:users-group' },
  },
  {
    title: 'المواد',
    to: { name: 'materials' },
    icon: { icon: 'tabler:books' },
  },
  {
    title: 'الحساب',
    to: { name: 'aboutAccount' },
    icon: { icon: 'tabler:user' },
  },
  {
    title: 'المدرسين',
    to: { name: 'teacher' },
    icon: { icon: 'tabler:certificate' },
  },
] as HorizontalNavItems;
