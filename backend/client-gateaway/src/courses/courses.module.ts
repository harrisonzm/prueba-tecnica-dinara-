import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { COURSES_SERVICE, envs } from 'src/config';

@Module({
  controllers: [CoursesController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: COURSES_SERVICE,
        transport: Transport.TCP,
        options: { host: envs.coursesMsHost, port: envs.coursesMsPort },
      },
    ]),
  ],
})
export class CoursesModule {}
