import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InscriptionsService } from './inscriptions.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';

@Controller('courses/inscriptions')
export class InscriptionsController {
  constructor(private readonly inscriptionsService: InscriptionsService) {}

  @Post()
  create(@Body() createInscriptionDto: CreateInscriptionDto) {
    return this.inscriptionsService.create(createInscriptionDto);
  }

  @Get()
  findAll() {
    return this.inscriptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inscriptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInscriptionDto: UpdateInscriptionDto) {
    return this.inscriptionsService.update(+id, updateInscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inscriptionsService.remove(+id);
  }
}
