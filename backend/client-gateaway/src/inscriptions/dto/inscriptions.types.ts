import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class Inscription {
  @IsString()
  @IsNotEmpty()
  idUser: string;

  @IsString()
  @IsNotEmpty()
  idCourse: string;
}

export class UpdateInscription extends PartialType(Inscription) {}
