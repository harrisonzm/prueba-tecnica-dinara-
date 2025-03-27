
export interface Course {
    id:string,
    name: string,
    limit: number,
    students: number
}

export interface CourseWithoutStudents extends Omit<Course, "students">{};


export const initializeCourseForm: Record<keyof CourseWithoutStudents, any> = {
    id: '',
    name: '',
    limit: 0,
  }

  export const labelCourseForm: Record<keyof CourseWithoutStudents, any> = {
    id: "ID:",
    name: 'Nombre',
    limit: "limite",
  }
