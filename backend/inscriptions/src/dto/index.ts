import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class Inscription {
  @IsString()
  @IsNotEmpty()
  idUser: string;

  @IsString()
  @IsNotEmpty()
  idCourse: string;
}
export class UpdateInscriptionDto extends PartialType(Inscription) {}
