import { Injectable } from '@nestjs/common';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';

@Injectable()
export class InscriptionsService {
  create(createInscriptionDto: CreateInscriptionDto) {
    return 'This action adds a new inscription';
  }

  findAll() {
    return `This action returns all inscriptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inscription`;
  }

  update(id: number, updateInscriptionDto: UpdateInscriptionDto) {
    return `This action updates a #${id} inscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} inscription`;
  }
}
