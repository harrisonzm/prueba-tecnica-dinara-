import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CoursesModule } from './courses/courses.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { UsersModule } from './users/users.module';
import { SharedClientsModule } from './utils/sharedClientsModule';

@Module({
  imports: [CoursesModule, InscriptionsModule, UsersModule, SharedClientsModule],
  controllers: [AppController],
})
export class AppModule {}
