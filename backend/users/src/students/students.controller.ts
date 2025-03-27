import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { StudentsService } from './students.service';
import { UpdateUserDto, User } from './entities/student.entity';

@Controller()
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @MessagePattern('createStudent')
  async create(@Payload() createStudentDto: User): Promise<User> {
    return await this.studentsService.create(createStudentDto);
  }

  @MessagePattern('findAllStudents')
  async findAll() {
    return await this.studentsService.findAll();
  }

  @MessagePattern('findOneStudent')
  async findOne(@Payload() id: string): Promise<User | null> {
    if (!id) {
      throw new RpcException(
        'El ID del usuario es requerido para encontrarlo.',
      );
    }
    return await this.studentsService.findOne(id);
  }

  @MessagePattern('updateStudent')
  async update(
    @Payload() updateStudentDto: UpdateUserDto,
  ): Promise<User | null> {
    if (!updateStudentDto.id) {
      throw new RpcException('El ID del usuario es requerido para actualizar.');
    }
    return await this.studentsService.update(
      updateStudentDto.id,
      updateStudentDto,
    );
  }

  @MessagePattern('deleteStudent')
  async remove(@Payload() id: string): Promise<User | null> {
    if (!id) {
      throw new RpcException('El ID del usuario es requerido para eliminar.');
    }
    return await this.studentsService.remove(id);
  }
}
