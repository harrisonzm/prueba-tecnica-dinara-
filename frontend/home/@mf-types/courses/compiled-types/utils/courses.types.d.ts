export interface Course {
    id: string;
    name: string;
    limit: number;
    students: number;
}
export interface CourseWithoutStudents extends Omit<Course, "students"> {
}
export declare const initializeCourseForm: Record<keyof CourseWithoutStudents, any>;
export declare const labelCourseForm: Record<keyof CourseWithoutStudents, any>;
