import { Test, TestingModule } from '@nestjs/testing';
import { InscriptionsController } from './inscriptions.controller';
import { Inscription } from './inscriptions.types';
import { RpcException } from '@nestjs/microservices';

describe('InscriptionsController', () => {
  let controller: InscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InscriptionsController],
    }).compile();

    controller = module.get<InscriptionsController>(InscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('debería crear un inscripción correctamente', async () => {
    const inscriptionData: Inscription = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    const createdInscription: Inscription =
      await controller.createInscription(inscriptionData);
    expect(createdInscription).toMatchObject(inscriptionData);
  });

  it('debería lanzar error si el ID ya existe', async () => {
    const inscriptionData: Inscription = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    await controller.createInscription(inscriptionData);
    await expect(controller.createInscription(inscriptionData)).rejects.toThrow(
      RpcException,
    );
  });

  it('debería obtener todos los inscripciones por su usuario y curso', async () => {
    const inscription: Inscription = {
      idUser: '123546879',
      idCourse: '00000001',
    };
    await controller.createInscription(inscription);
    const inscriptionReturn = await controller.findAllInscriptions(inscription);
    expect(inscriptionReturn).toMatchObject(Inscription);
    expect(inscriptionReturn).toEqual(inscription);
  });

  it('debería obtener todos los inscripciones por su usuario', async () => {
    const inscriptions: Inscription[] = [
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
      {
        idUser: '123546879',
        idCourse: '00000002',
      },
    ];

    for (const inscription of inscriptions) {
      await controller.createInscription(inscription);
    }

    const inscriptionsReturn = await controller.findAllInscriptions({
      idUser: inscriptions[0].idUser,
    });
    expect(inscriptionsReturn).toBe(Array);
    expect(inscriptionsReturn[0]).toMatchObject(Inscription);
    expect(inscriptionsReturn).toHaveLength(2);
  });

  it('debería obtener un inscripción por su curso', async () => {
    const inscriptions: Inscription[] = [
      {
        idUser: '123546878',
        idCourse: '00000001',
      },
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
    ];

    for (const inscription of inscriptions) {
      await controller.createInscription(inscription);
    }

    const inscriptionsReturn = await controller.findAllInscriptions({
      idCourse: inscriptions[0].idCourse,
    });
    expect(inscriptionsReturn).toBe(Array);
    expect(inscriptionsReturn[0]).toMatchObject(Inscription);
    expect(inscriptionsReturn).toHaveLength(2);
  });

  it('debería lanzar error si el inscripción no existe', async () => {
    await expect(
      controller.removeInscription({ idUser: '999999999' }),
    ).rejects.toThrow(RpcException);
  });

  it('debería eliminar un inscripción por su ID de usuario', async () => {
    const inscriptionData: Inscription = {
      idUser: '123546879',
      idCourse: '00000001',
    };

    await controller.createInscription(inscriptionData);

    await controller.removeInscription({ idUser: inscriptionData.idUser });

    const deletedInscription = controller.findAllInscriptions({
      idUser: inscriptionData.idUser,
    });

    expect(deletedInscription).toBeNull();
  });

  it('debería lanzar error al intentar eliminar un inscripción que no existe', async () => {
    await expect(
      controller.removeInscription({ idUser: '999999999' }),
    ).rejects.toThrow(RpcException);
  });

  it('debería obtener todos los inscripciones', async () => {
    const inscriptionsData = [
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
      {
        idUser: '123546879',
        idCourse: '00000001',
      },
    ];
    for (const inscription of inscriptionsData) {
      await controller.createInscription(inscription);
    }
    // Insertar los inscripciones en la base de datos

    // Obtener los inscripciones con el servicio
    const inscriptions = controller.findAllInscriptions({});
    expect(inscriptions).toBe(Array);
    expect(inscriptions).toHaveLength(2);
    expect(inscriptions[0]).toMatchObject(Inscription);

    // Eliminar los inscripciones creados para limpiar la base de datos
    for (const inscription of inscriptionsData) {
      await controller.removeInscription(inscription);
    }

    // Verificar que se eliminaron correctamente
    const remaininginscriptions = controller.findAllInscriptions({});
    expect(remaininginscriptions).toBe(Array);
    expect(remaininginscriptions).toHaveLength(0);
  });
});
