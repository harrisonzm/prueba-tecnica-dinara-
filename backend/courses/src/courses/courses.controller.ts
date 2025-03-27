import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CoursesService } from './courses.service';
import { CourseDto, UpdateCourseDto } from 'src/dto';

@Controller()
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @MessagePattern('createCourse')
  async create(@Payload() createCourseDto: CourseDto): Promise<CourseDto> {
    return await this.coursesService.create(createCourseDto);
  }

  @MessagePattern('findAllCourses')
  async findAll(): Promise<CourseDto[]> {
    return await this.coursesService.findAll();
  }

  @MessagePattern('findOneCourse')
  async findOne(@Payload() id: string): Promise<CourseDto> {
    return await this.coursesService.findOne(id);
  }

  @MessagePattern('updateCourse')
  async update(
    @Payload() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseDto> {
    if (!updateCourseDto.id) updateCourseDto.id = '';
    return await this.coursesService.update(
      updateCourseDto.id,
      updateCourseDto,
    );
  }

  @MessagePattern('deleteCourse')
  async remove(@Payload() id: string): Promise<CourseDto> {
    return await this.coursesService.remove(id);
  }
}
