import { Test, TestingModule } from '@nestjs/testing';
import { InscriptionsController } from './inscriptions.controller';
import { InscriptionsService } from './inscriptions.service';

describe('InscriptionsController', () => {
  let controller: InscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InscriptionsController],
      providers: [InscriptionsService],
    }).compile();

    controller = module.get<InscriptionsController>(InscriptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
