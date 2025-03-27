
    export type RemoteKeys = 'courses/CourseCard' | 'courses/CoursesList' | 'courses/CreateCourseForm';
    type PackageType<T> = T extends 'courses/CreateCourseForm' ? typeof import('courses/CreateCourseForm') :T extends 'courses/CoursesList' ? typeof import('courses/CoursesList') :T extends 'courses/CourseCard' ? typeof import('courses/CourseCard') :any;