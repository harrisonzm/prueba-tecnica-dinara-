export interface User {
    id: string;
    fullName: string;
    departmentOfIssue: string;
    placeOfIssue: string;
    gender: string;
    ethnicity: string;
    personalEmail: string;
    institutionalEmail: string;
    mobilePhone: string;
    landlinePhone: string;
    birthDate: string;
    nationality: string;
  }

export const initialFormState = {
  id: '',
  fullName: '',
  departmentOfIssue: '',
  placeOfIssue: '',
  gender: '',
  ethnicity: '',
  personalEmail: '',
  institutionalEmail: '',
  mobilePhone: '',
  landlinePhone: '',
  birthDate: '',
  nationality: '',
};

export const UserFieldLabels: Record<keyof User, string> = {
      id: 'ID',
      fullName: 'Full Name',
      departmentOfIssue: 'Dept. of Issue',
      placeOfIssue: 'Place of Issue',
      gender: 'Gender',
      ethnicity: 'Ethnicity',
      personalEmail: 'Personal Email',
      institutionalEmail: 'Institutional Email',
      mobilePhone: 'Mobile Phone',
      landlinePhone: 'Landline Phone',
      birthDate: 'Birth Date',
      nationality: 'Nationality',
  };

export const fieldTypes: Record<keyof User, string> = {
  id: 'text',
  fullName: 'text',
  departmentOfIssue: 'text',
  placeOfIssue: 'text',
  gender: 'select',
  ethnicity: 'text',
  personalEmail: 'email',
  institutionalEmail: 'email',
  mobilePhone: 'tel',
  landlinePhone: 'tel',
  birthDate: 'date',
  nationality: 'text',
};

export const genderOptions = ['Male', 'Female', 'Other'];
