import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [CoursesModule],
  controllers: [AppController],
})
export class AppModule {}
