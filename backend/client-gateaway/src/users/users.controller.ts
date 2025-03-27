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
@Controller('users/student')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly userClient: ClientProxy,
    @Inject(INSCRIPTIONS_SERVICE)
    private readonly inscriptionsClient: ClientProxy,
  ) {}

  @Post()
  async createStudent(@Body() User: User) {
    
  }

  @Get()
  async findAllStudents(): Promise<User[]> {
    
  }

  @Get(':id')
  async findOneStudent(@Param('id') id: string): Promise<User> {
    
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUser: UpdateUser,
  ): Promise<User> {
    
  }

  @Delete(':id')
  async removeStudent(@Param('id') id: string): Promise<User> {
   
}
