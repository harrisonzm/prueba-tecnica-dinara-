import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { COURSES_SERVICE, INSCRIPTIONS_SERVICE } from '../config/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Course, CourseWithStudents, UpdateCourse } from './dto/courses.types';
import { Inscription } from 'src/inscriptions/dto/inscriptions.types';
import { handleRpcError } from 'src/utils';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject(COURSES_SERVICE) private readonly coursesClient: ClientProxy,
    @Inject(INSCRIPTIONS_SERVICE)
    private readonly inscriptionsClient: ClientProxy,
  ) {}

  @Post()
  async createCourse(@Body() createCourseDto: Course): Promise<Course> {
    try {
      return await firstValueFrom<Course>(
        this.coursesClient.send('createCourse', createCourseDto),
      );
    } catch (error: unknown) {
      throw handleRpcError(error, 'Error en la creación del curso');
    }
  }

  @Get()
  async findAllCourses(): Promise<CourseWithStudents[]> {
    try {
      const coursesWithEnrollments: CourseWithStudents[] = [];
      const courses: Course[] = await firstValueFrom<Course[]>(
        this.coursesClient.send('findAllCourses', {}),
      );
      for (const course of courses) {
        const enrollments: Inscription[] = await firstValueFrom<Inscription[]>(
          this.inscriptionsClient.send('findAllInscriptions', {
            idCourse: course.id,
          }),
        );

        coursesWithEnrollments.push({
          ...course,
          students: enrollments.length,
        });
      }
      return coursesWithEnrollments;
    } catch (error) {
      throw handleRpcError(error, 'Error en al buscar curso');
    }
  }

  @Get(':id')
  async findOneCourse(@Param('id') id: string): Promise<CourseWithStudents> {
    try {
      const course: Course = await firstValueFrom<Course>(
        this.coursesClient.send('findOneCourse', id),
      );
      const enrollments: Inscription[] = await firstValueFrom(
        this.inscriptionsClient.send('findAllInscriptions', { idCourse: id }),
      );
      return {
        ...course,
        students: enrollments.length,
      };
    } catch (error) {
      throw handleRpcError(error, 'error al buscar el curso');
    }
  }

  @Patch(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourse,
  ): Promise<Course> {
    try {
      const updatedData: UpdateCourseDto = { ...updateCourseDto, id };
      console.log(updatedData, 'entrando');
      return await firstValueFrom<Course>(
        this.coursesClient.send('updateCourse', updatedData),
      );
    } catch (error: unknown) {
      throw handleRpcError(error, 'Error en la actualización del curso');
    }
  }

  @Delete(':id')
  async removeCourse(@Param('id') id: string): Promise<Course> {
    try {
      const course: Course = await firstValueFrom<Course>(
        this.coursesClient.send('deleteCourse', id),
      );
      await firstValueFrom<Inscription[]>(
        this.inscriptionsClient.send('deleteInscription', { idCourse: id }),
      );
      return course;
    } catch (error) {
      throw handleRpcError(error, 'error al remover el curso');
    }
  }
}
