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
export declare const initialFormState: {
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
};
export declare const UserFieldLabels: Record<keyof User, string>;
export declare const fieldTypes: Record<keyof User, string>;
export declare const genderOptions: string[];
