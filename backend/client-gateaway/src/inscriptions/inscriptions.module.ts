import { Module } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { InscriptionsController } from './inscriptions.controller';

@Module({
  controllers: [InscriptionsController],
  providers: [InscriptionsService],
})
export class InscriptionsModule {}
