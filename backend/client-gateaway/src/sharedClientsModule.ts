// shared-clients.module.ts

import { Module, Global } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  COURSES_SERVICE,
  INSCRIPTIONS_SERVICE,
  USERS_SERVICE,
} from './config/services';
import { envs } from './config';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: USERS_SERVICE,
        transport: Transport.TCP,
        options: { host: envs.usersMsHost, port: envs.usersMsPort },
      },
      {
        name: INSCRIPTIONS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.inscriptionsMsHost,
          port: envs.inscriptionsMsPort,
        },
      },
      {
        name: COURSES_SERVICE,
        transport: Transport.TCP,
        options: { host: envs.coursesMsHost, port: envs.coursesMsPort },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class SharedClientsModule {}
