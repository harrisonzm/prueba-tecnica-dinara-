import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';

export class CourseDto {
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

export class UpdateCourseDto extends PartialType(CourseDto) {}
