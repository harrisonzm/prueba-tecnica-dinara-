import {
  Get,
  Post,
  Body,
  Delete,
  Query,
  Inject,
  HttpException,
  InternalServerErrorException,
  Controller,
} from '@nestjs/common';
import { Inscription } from './inscriptions.types';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  INSCRIPTIONS_SERVICE,
  COURSES_SERVICE,
  USERS_SERVICE,
} from 'src/config';
import { firstValueFrom } from 'rxjs';
import { Course } from 'src/courses/courses.types';
import { User } from 'src/users/users.types';
import { handleRpcError } from 'src/utils';

@Controller('/courses/inscriptions')
export class InscriptionsController {
  constructor(
    @Inject(INSCRIPTIONS_SERVICE)
    private readonly inscriptionsClient: ClientProxy,
    @Inject(COURSES_SERVICE) private readonly courseClient: ClientProxy,
    @Inject(USERS_SERVICE) private readonly studentClient: ClientProxy,
  ) {}

  @Post()
  async createInscription(
    @Body() createInscriptionDto: Inscription,
  ): Promise<Inscription> {
    const { idUser, idCourse } = createInscriptionDto;
    try {
      // Verificar si el estudiante existe
      const student: User = await firstValueFrom(
        this.studentClient.send('findOneStudent', idUser),
      );
      if (!student) {
        throw new HttpException('El estudiante no existe', 404);
      }

      // Verificar si el curso existe y si hay cupo disponible
      const course: Course = await firstValueFrom(
        this.courseClient.send('findOneCourse', idCourse),
      );
      if (!course) {
        throw new HttpException('El curso no existe', 404);
      }

      const enrolledStudents: Inscription[] = await firstValueFrom(
        this.inscriptionsClient.send('findAllInscriptions', {
          idCourse: createInscriptionDto.idCourse,
        }),
      );

      if (enrolledStudents.length >= course.limit) {
        throw new HttpException('No hay cupo en el curso', 400);
      }

      // Crear la inscripción si no hay errores
      return await firstValueFrom(
        this.inscriptionsClient.send('createInscription', createInscriptionDto),
      );
    } catch (error) {
      throw handleRpcError(error, 'Error al inscribir al estudiante');
    }
  }

  @Get()
  async findAllInscriptions(
    @Query() query: { idUser?: string; idCourse?: string },
  ): Promise<Inscription | Inscription[]> {
    try {
      if (query.idUser || query.idCourse) {
        return await firstValueFrom<Inscription[]>(
          this.inscriptionsClient.send('findAllInscriptions', query),
        );
      } else {
        return await firstValueFrom<Inscription>(
          this.inscriptionsClient.send('findAllInscriptions', query),
        );
      }
    } catch (error) {
      throw handleRpcError(error, 'error al encontrar las inscripciones');
    }
  }
  @Delete()
  async removeInscription(
    @Query() query: { idUser?: string; idCourse?: string }
  ): Promise<Inscription | Inscription[]> {
    try {
      if (!query.idUser && !query.idCourse) {
        return await firstValueFrom<Inscription[]>(
          this.inscriptionsClient.send('deleteInscription', query),
        );
      } else {
        return await firstValueFrom<Inscription>(
          this.inscriptionsClient.send('deleteInscription', query),
        );
      }
    } catch (error) {
      throw handleRpcError(error, 'error al eliminar la inscripción');
    }
  }
}
