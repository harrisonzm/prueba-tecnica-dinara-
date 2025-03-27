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
export interface Course {
    id: string;
    name: string;
    limit: number;
    students: number;
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
export interface Inscription {
    idUser: string;
    idCourse: string;
}
