export interface Inscription {
    idUser: string;
    idCourse: string;
}
type CoursesListProps = {
    idUser?: string;
};
export declare function CoursesList({ idUser }: CoursesListProps): import("react/jsx-runtime").JSX.Element;
export default CoursesList;
