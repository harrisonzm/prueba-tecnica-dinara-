import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';
import { InscriptionsModule } from './inscriptions/inscriptions.module';
import { CoursesModule } from './courses/courses.module';
import { SharedClientsModule } from './sharedClientsModule';
import { AppController } from './app.controller';

@Module({
  imports: [
    HttpModule,
    UsersModule,
    InscriptionsModule,
    CoursesModule,
    SharedClientsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
