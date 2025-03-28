import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { Course, CourseWithStudents } from './courses.types';
import { RpcException } from '@nestjs/microservices';

describe('CoursesController', () => {
  let controller: CoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
  });

  afterEach(async () => {
    // Limpieza entre tests
    const allCourses: CourseWithStudents[] = await controller.findAllCourses();
    for (const course of allCourses) {
      await controller.removeCourse(course.course.id);
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCourse', () => {
    it('debería crear un curso correctamente', async () => {
      const courseData: Course = {
        id: '1',
        name: 'estadistica',
        limit: 15,
      };
      const createdCourse: Course = await controller.createCourse(courseData);
      expect(createdCourse).toMatchObject(courseData);
    });

    it('debería lanzar error si el ID ya existe', async () => {
      const courseData: Course = {
        id: '1',
        name: 'estadistica',
        limit: 15,
      };
      await controller.createCourse(courseData);

      await expect(controller.createCourse(courseData)).rejects.toThrow(
        RpcException,
      );
    });
  });

  describe('updateCourse', () => {
    it('debería actualizar un curso correctamente', async () => {
      const course: Course = { id: '2', name: 'estadistica', limit: 15 };
      await controller.createCourse(course);

      const updated: Course = await controller.updateCourse(course.id, {
        name: 'estadística avanzada',
      });
      expect(updated.name).toBe('estadística avanzada');
      expect(updated.id).toBe(course.id);
    });

    it('debería lanzar error al actualizar con campo inválido', async () => {
      const course: Course = { id: '3', name: 'estadistica', limit: 15 };
      await controller.createCourse(course);

      await expect(
        controller.updateCourse(course.id, {
          invalidField: 'valor no permitido',
        }),
      ).rejects.toThrow(RpcException);
    });

    it('debería lanzar error al actualizar con tipo de dato incorrecto', async () => {
      const course: Course = { id: '4', name: 'estadistica', limit: 15 };
      await controller.createCourse(course);

      await expect(
        controller.updateCourse(course.id, { limit: 'no es un número' }),
      ).rejects.toThrow(RpcException);
    });

    it('debería lanzar error si el curso no existe', async () => {
      await expect(
        controller.updateCourse('999', { name: 'inexistente' }),
      ).rejects.toThrow(RpcException);
    });
  });

  describe('findAllCourses y findOneCourse', () => {
    it('debería obtener todos los cursos', async () => {
      const courses = [
        { id: '5', name: 'matemáticas', limit: 20 },
        { id: '6', name: 'historia', limit: 25 },
      ];
      for (const c of courses) {
        await controller.createCourse(c);
      }

      const result = await controller.findAllCourses();
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject(courses[0]);
      expect(result[1]).toMatchObject(courses[1]);
    });

    it('debería obtener un curso por ID', async () => {
      const course = { id: '7', name: 'programación', limit: 30 };
      await controller.createCourse(course);

      const result = await controller.findOneCourse('7');
      expect(result).toMatchObject(course);
    });

    it('debería lanzar error si el curso no existe', async () => {
      await expect(controller.findOneCourse('999')).rejects.toThrow(
        RpcException,
      );
    });
  });

  describe('removeCourse', () => {
    it('debería eliminar un curso correctamente', async () => {
      const course = { id: '8', name: 'biología', limit: 20 };
      await controller.createCourse(course);

      await controller.removeCourse('8');
      const deleted = await controller.findOneCourse('8');
      expect(deleted).toBeNull();
    });

    it('debería lanzar error si intenta eliminar un curso inexistente', async () => {
      await expect(controller.removeCourse('999')).rejects.toThrow(
        RpcException,
      );
    });
  });

  describe('flujo completo', () => {
    it('debería crear, obtener, actualizar y eliminar un curso correctamente', async () => {
      const course = { id: '9', name: 'física', limit: 30 };

      const created = await controller.createCourse(course);
      expect(created).toMatchObject(course);

      const fetched = await controller.findOneCourse('9');
      expect(fetched).toMatchObject(course);

      const updated = await controller.updateCourse('9', {
        name: 'física avanzada',
      });
      expect(updated.name).toBe('física avanzada');

      await controller.removeCourse('9');
      const deleted = await controller.findOneCourse('9');
      expect(deleted).toBeNull();
    });
  });
});
