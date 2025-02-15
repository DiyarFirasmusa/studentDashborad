import type { HorizontalNavItems } from '@layouts/types';

export default [
  {
    title: 'الطلاب',
    to: { name: 'student' },
    icon: { icon: 'tabler:smart-home' },
  },
  {
    title: 'المواد',
    to: { name: 'materials' },
    icon: { icon: 'tabler:smart-home' },
  },
  {
    title: 'الصلاحيات',
    to: { name: 'users' },
    icon: { icon: 'tabler:smart-home' },
  },
  {
    title: 'عن الحساب',
    to: { name: 'aboutAccount' },
    icon: { icon: 'tabler:smart-home' },
  },
] as HorizontalNavItems;
