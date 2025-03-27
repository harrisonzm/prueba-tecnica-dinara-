import { HttpException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto, User } from './entities/student.entity';
import { Prisma } from '@prisma/client';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class StudentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createStudentDto: User): Promise<User> {
    try {
      console.log('ENTRO AL SERVICIO ----------------------');
      console.log(createStudentDto);
      return await this.databaseService.users.create({
        data: createStudentDto,
      });
    } catch (error) {
      console.log('NO CREADO ------------------------');
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

  async createMany(createStudentDto: User[]): Promise<User[]> {
    return await this.databaseService.users.createManyAndReturn({
      data: createStudentDto,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.databaseService.users.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user: User | null = await this.databaseService.users.findFirst({
      where: { id },
    });
    if (!user) {
      throw new RpcException(`No se encontró el estudiante con ID: ${id}`);
    }
    return user;
  }

  async update(
    id: string,
    updateStudentDto: UpdateUserDto,
  ): Promise<User | null> {
    try {
      return await this.databaseService.users.update({
        where: { id },
        data: updateStudentDto,
      });
    } catch (error) {
      if ('code' in Object.keys(error)) {
        if (error.code === 'P2025') {
          throw new RpcException(`No se encontró el estudiante con ID: ${id}`);
        }
      } else if (error instanceof Prisma.PrismaClientValidationError) {
        throw new RpcException('Datos inválidos en la actualización.');
      }
      throw new HttpException('El estudiante no existe', 404);
    }
  }

  async remove(id: string): Promise<User | null> {
    try {
      return await this.databaseService.users.delete({ where: { id } });
    } catch (error) {
      if ('code' in Object.keys(error)) {
        if (error.code === 'P2025') {
          throw new RpcException(`No se encontró el estudiante con ID: ${id}`);
        }
      }
      throw new HttpException('El estudiante no existe', 404);
    }
  }
}
