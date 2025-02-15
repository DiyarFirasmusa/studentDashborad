export const requiredValidator = (v: string) => !!v || 'هذا الحقل مطلوب'
export const fullNameValidator = (v: string) => (v && v.length >= 3) ||    'يجب ان يكون الاسم اكثر من 10 حرف'
export const dateValidator = (v: string) => /^\d{4}-\d{2}-\d{2}$/.test(v) || 'يجب ان يكون التاريخ بالصيغة الصحيحة'
export const emailValidator = (v: string) => /.+@.+\..+/.test(v) || 'الايميل غير صحيح'
export const integerValidator = (v: string) => /^-?\d+$/.test(v) || 'يجب ان يكون الرقم صحيحاً';
export const roleRequiredValidator = (v: any) => {
    if (Array.isArray(v)) {
      return v.length > 0 || 'هذا الحقل مطلوب';
    }
  };