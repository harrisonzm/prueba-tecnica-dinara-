import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User } from './users.types';
import { RpcException } from '@nestjs/microservices';
import { INSCRIPTIONS_SERVICE, USERS_SERVICE } from 'src/config';
import { of, throwError } from 'rxjs';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: { send: jest.Mock };
  let mockInscriptionsService: { send: jest.Mock };

  beforeEach(async () => {
    mockUsersService = { send: jest.fn() };
    mockInscriptionsService = { send: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: USERS_SERVICE, useValue: mockUsersService },
        { provide: INSCRIPTIONS_SERVICE, useValue: mockInscriptionsService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const userData: User = {
    id: '00001',
    fullName: 'Carlos López',
    departmentOfIssue: 'Antioquia',
    placeOfIssue: 'Medellín',
    gender: 'M',
    ethnicity: 'Afrocolombiano',
    personalEmail: 'carlos@example.com',
    institutionalEmail: 'carlos@school.edu',
    mobilePhone: '+573002223344',
    landlinePhone: '7654321',
    birthDate: new Date('1999-05-15'),
    nationality: 'Colombiana',
  };

  it('debería crear un estudiante correctamente', async () => {
    mockUsersService.send.mockReturnValueOnce(of(userData));

    const createdStudent = await controller.createStudent(userData);
    expect(createdStudent).toEqual(userData);
    expect(mockUsersService.send).toHaveBeenCalledWith(
      { cmd: 'createStudent' },
      userData,
    );
  });

  it('debería lanzar error si el ID ya existe', async () => {
    const error = new RpcException('El campo id ya está en uso.');
    mockUsersService.send.mockReturnValueOnce(throwError(() => error));

    await expect(controller.createStudent(userData)).rejects.toThrow(
      RpcException,
    );
  });

  it('debería actualizar un estudiante correctamente', async () => {
    const updatedData = { ...userData, fullName: 'Pedro Modificado' };
    mockUsersService.send.mockReturnValueOnce(of(updatedData));

    const result = await controller.updateUser(userData.id, {
      fullName: 'Pedro Modificado',
    });
    expect(result.fullName).toBe('Pedro Modificado');
  });

  it('debería lanzar error al intentar actualizar con campos inválidos', async () => {
    const error = new RpcException('Campo inválido');
    mockUsersService.send.mockReturnValueOnce(throwError(() => error));

    await expect(
      controller.updateUser(userData.id, {
        invalidField: 'no permitido',
      } as any),
    ).rejects.toThrow(RpcException);
  });

  it('debería lanzar error al intentar actualizar con tipo de dato incorrecto', async () => {
    const error = new RpcException('Datos inválidos en la actualización.');
    mockUsersService.send.mockReturnValueOnce(throwError(() => error));

    await expect(
      controller.updateUser(userData.id, {
        birthDate: 'fecha-invalida' as any,
      }),
    ).rejects.toThrow(RpcException);
  });

  it('debería lanzar error si intenta actualizar un estudiante que no existe', async () => {
    const error = new RpcException('No se encontró el estudiante con ID: 999');
    mockUsersService.send.mockReturnValueOnce(throwError(() => error));

    await expect(
      controller.updateUser('999', { fullName: 'No existe' }),
    ).rejects.toThrow(RpcException);
  });

  it('debería obtener todos los estudiantes', async () => {
    const students: User[] = [userData];
    mockUsersService.send.mockReturnValueOnce(of(students));

    const result = await controller.findAllStudents();
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(userData);
  });

  it('debería obtener un estudiante por su ID', async () => {
    mockUsersService.send.mockReturnValueOnce(of(userData));

    const student = await controller.findOneStudent(userData.id);
    expect(student).toEqual(userData);
  });

  it('debería lanzar error si el estudiante no existe', async () => {
    const error = new RpcException('No encontrado');
    mockUsersService.send.mockReturnValueOnce(throwError(() => error));

    await expect(controller.findOneStudent('999')).rejects.toThrow(
      RpcException,
    );
  });

  it('debería eliminar un estudiante por su ID', async () => {
    mockUsersService.send.mockReturnValueOnce(of(userData));

    const deletedStudent = await controller.removeStudent(userData.id);
    expect(deletedStudent).toEqual(userData);
  });

  it('debería lanzar error al intentar eliminar un estudiante que no existe', async () => {
    const error = new RpcException('No encontrado');
    mockUsersService.send.mockReturnValueOnce(throwError(() => error));

    await expect(controller.removeStudent('999')).rejects.toThrow(RpcException);
  });
});
