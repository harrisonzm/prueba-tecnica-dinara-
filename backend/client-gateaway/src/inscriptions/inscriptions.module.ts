import { Module } from '@nestjs/common';
import { InscriptionsController } from './inscriptions.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, INSCRIPTIONS_SERVICE } from 'src/config';

@Module({
  controllers: [InscriptionsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: INSCRIPTIONS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.inscriptionsMsHost,
          port: envs.inscriptionsMsPort,
        },
      },
    ]),
  ],
})
export class InscriptionsModule {}
