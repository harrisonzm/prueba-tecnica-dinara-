import React from 'react';
import { Course } from '../utils/courses.types';
interface CourseCardProps {
    course: Course;
    onUpdated?: () => void;
}
export declare const CourseCard: React.FC<CourseCardProps>;
export default CourseCard;
