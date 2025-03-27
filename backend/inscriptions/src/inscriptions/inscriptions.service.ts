import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { DatabaseService } from 'src/database/database.service';
import { Inscription } from 'src/dto';

@Injectable()
export class InscriptionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createInscriptionDto: Inscription): Promise<Inscription> {
    try {
      return await this.databaseService.inscriptions.create({
        data: createInscriptionDto,
      });
    } catch (error) {
      if ('code' in error) {
        if (error.code === 'P2002') {
          console.error('❌ Inscripción duplicada.');
          throw new RpcException({
            statusCode: 400,
            message: 'El usuario ya está inscrito en este curso.',
          });
        }
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Error interno en el microservicio.',
      });
    }
  }

  async findAll(filter: {
    idUser?: string;
    idCourse?: string;
  }): Promise<Inscription[]> {
    try {
      return await this.databaseService.inscriptions.findMany({
        where: {
          ...(filter.idUser ? { idUser: filter.idUser } : {}),
          ...(filter.idCourse ? { idCourse: filter.idCourse } : {}),
        },
      });
    } catch (error) {
      console.log(error);
      throw new RpcException({
        statusCode: 500,
        message: 'Error al obtener las inscripciones.',
      });
    }
  }

  async remove(data: { idUser?: string; idCourse?: string }) {
    try {
      if (data.idUser && data.idCourse) {
        // Eliminar una inscripción específica
        return await this.databaseService.inscriptions.delete({
          where: {
            idUser_idCourse: {
              idUser: data.idUser,
              idCourse: data.idCourse,
            },
          },
        });
      } else if (data.idUser) {
        // Eliminar todas las inscripciones de un usuario
        return await this.databaseService.inscriptions.deleteMany({
          where: {
            idUser: data.idUser,
          },
        });
      } else if (data.idCourse) {
        // Eliminar todas las inscripciones de un curso
        return await this.databaseService.inscriptions.deleteMany({
          where: {
            idCourse: data.idCourse,
          },
        });
      } else {
        throw new RpcException({
          statusCode: 400,
          message: 'Se requiere al menos un idUser o idCourse.',
        });
      }
    } catch (error) {
      if ('code' in error) {
        if (error.code === 'P2025') {
          throw new RpcException({
            statusCode: 404,
            message: 'La inscripción no existe.',
          });
        }
      }
      throw new RpcException({
        statusCode: 500,
        message: 'Error al eliminar la inscripción.',
      });
    }
  }
}
