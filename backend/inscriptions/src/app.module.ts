import { Module } from '@nestjs/common';
import { InscriptionsModule } from './inscriptions/inscriptions.module';

@Module({
  imports: [InscriptionsModule],
})
export class AppModule {}
