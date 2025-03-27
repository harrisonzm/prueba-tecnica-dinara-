import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class Course {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  limit: number;
}

export class UpdateCourse extends PartialType(Course) {}

export class CourseWithStudents extends Course {
  students: number;
}
