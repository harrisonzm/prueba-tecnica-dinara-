import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';

@Module({
  imports: [CoursesModule, InscriptionsModule],
  controllers: [AppController],
})
export class AppModule {}
