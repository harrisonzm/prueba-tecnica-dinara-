import { DatabaseService } from 'src/database/database.service';
import { Injectable } from '@nestjs/common';
import { CourseDto, UpdateCourseDto } from 'src/dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CoursesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCourseDto: CourseDto): Promise<CourseDto> {
    try {
      return await this.databaseService.courses.create({
        data: createCourseDto,
      });
    } catch (error) {
      if ('code' in Object.keys(error)) {
        if (error.code === 'P2002') {
          const field =
            (error.meta?.target as string[])?.join(', ') || 'desconocido';
          console.error(`❌ Error de unicidad en: ${field}`);
          throw new RpcException({
            statusCode: 400,
            message: `El campo ${field} ya está en uso.`,
          });
        }
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Error interno en el microservicio.',
      });
    }
  }

  findAll(): Promise<CourseDto[]> {
    return this.databaseService.courses.findMany();
  }

  async findOne(id: string): Promise<CourseDto> {
    const course = await this.databaseService.courses.findUnique({
      where: { id },
    });
    if (!course) {
      throw new RpcException(`No se encontró el curso con ID: ${id}`);
    }
    return course;
  }

  async update(
    id: string,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDto> {
    try {
      const existingCourse = await this.databaseService.courses.findUnique({
        where: { id },
      });
      if (!existingCourse) {
        throw new RpcException(`No se encontró el curso con ID: ${id}`);
      }

      if (updateCourseDto.name) {
        const nameExists = await this.databaseService.courses.findUnique({
          where: { id },
        });
        if (nameExists && nameExists.id !== id) {
          throw new RpcException({
            statusCode: 400,
            message: `El nombre del curso '${updateCourseDto.name}' ya está en uso.`,
          });
        }
      }

      // Omitimos `id` explícitamente antes de actualizar
      const { id: _, ...dataToUpdate } = updateCourseDto;

      return await this.databaseService.courses.update({
        where: { id },
        data: dataToUpdate,
      });
    } catch (error) {
      throw new RpcException('Error al actualizar el curso.');
    }
  }

  async remove(id: string): Promise<CourseDto> {
    try {
      return await this.databaseService.courses.delete({
        where: { id },
      });
    } catch (error) {
      if ('code' in Object.keys(error)) {
        if (error.code === 'P2025') {
          throw new RpcException(`No se encontró el curso con ID: ${id}`);
        }
      }
      throw new RpcException('Error al eliminar el curso.');
    }
  }
}
