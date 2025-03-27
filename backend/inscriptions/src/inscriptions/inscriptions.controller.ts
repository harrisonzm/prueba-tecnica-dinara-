import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InscriptionsService } from './inscriptions.service';
import { Inscription } from 'src/dto';

@Controller()
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  @MessagePattern('createInscription')
  async create(
    @Payload() createInscriptionDto: Inscription,
  ): Promise<Inscription> {
    return await this.inscriptionsService.create(createInscriptionDto);
  }

  @MessagePattern('findAllInscriptions')
  async findAll(
    @Payload() query: { idUser?: string; idCourse?: string },
  ): Promise<Inscription[]> {
    return await this.inscriptionsService.findAll(query);
  }

  @MessagePattern('deleteInscription')
  async remove(@Payload() deleteBody: { idUser?: string; idCourse?: string }) {
    return await this.inscriptionsService.remove(deleteBody);
  }
}
