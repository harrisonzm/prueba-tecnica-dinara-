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
import { INSCRIPTIONS_SERVICE, USERS_SERVICE } from '../config/services';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { User, UpdateUser } from './dto/users.types';
import { handleRpcError } from 'src/utils';
@Controller('users/student')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly userClient: ClientProxy,
    @Inject(INSCRIPTIONS_SERVICE)
    private readonly inscriptionsClient: ClientProxy,
  ) {}

  @Post()
  async createStudent(@Body() User: User) {
    console.log('🛠 Enviando datos:', User);
    try {
      return await firstValueFrom<User>(
        this.userClient.send('createStudent', User),
      );
    } catch (error: unknown) {
      throw handleRpcError(error, 'error al crear un estudiante');
    }
  }

  @Get()
  async findAllStudents(): Promise<User[]> {
    try {
      return await firstValueFrom(this.userClient.send('findAllStudents', {}));
    } catch (error) {
      throw handleRpcError(error, 'error al buscar los estudiantes');
    }
  }

  @Get(':id')
  async findOneStudent(@Param('id') id: string): Promise<User> {
    try {
      return await firstValueFrom(this.userClient.send('findOneStudent', id));
    } catch (error) {
      throw handleRpcError(error, 'error al buscar el estudiante');
    }
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUser,
  ): Promise<User> {
    try {

      // Sobrescribe el ID en el DTO
      const updatedData = { ...updateUser, id };

      return await firstValueFrom<User>(
        this.userClient.send('updateStudent', updatedData),
      );
    } catch (error: unknown) {
      throw handleRpcError(error, 'error al actualizar el usuario');
    }
  }

  @Delete(':id')
  async removeStudent(@Param('id') id: string): Promise<User> {
    try {
      const student: User = await firstValueFrom<User>(
        this.userClient.send('deleteStudent', id),
      );
      await firstValueFrom(
        this.inscriptionsClient.send('deleteInscription', { idUser: id }),
      );
      return student;
    } catch (error) {
      throw handleRpcError(error, 'error al eliminar el estudiante');
    }
  }
}
