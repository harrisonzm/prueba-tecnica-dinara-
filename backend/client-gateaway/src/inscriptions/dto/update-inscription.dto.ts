import { PartialType } from '@nestjs/mapped-types';
import { CreateInscriptionDto } from './create-inscription.dto';

export class UpdateInscriptionDto extends PartialType(CreateInscriptionDto) {}
