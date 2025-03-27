import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsMobilePhone,
  IsAlphanumeric,
  IsDate,
} from 'class-validator';

export class User {
  @IsString()
  @IsAlphanumeric()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  departmentOfIssue: string;

  @IsString()
  @IsNotEmpty()
  placeOfIssue: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  ethnicity: string;

  @IsEmail()
  @IsNotEmpty()
  personalEmail: string;

  @IsEmail()
  @IsNotEmpty()
  institutionalEmail: string;

  @IsMobilePhone('es-CO') // O puedes usar 'any' si quieres global
  @IsNotEmpty()
  mobilePhone: string;

  @IsString()
  @IsNotEmpty()
  landlinePhone: string;

  @Transform((data: { value: string }) => new Date(data.value))
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  nationality: string;
}
export class UpdateUserDto extends PartialType(User) {}
