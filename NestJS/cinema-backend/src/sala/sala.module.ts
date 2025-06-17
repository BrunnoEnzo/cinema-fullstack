// src/sala/sala.module.ts
import { Module } from '@nestjs/common';
import { SalaService } from './sala.service';
import { SalaController } from './sala.controller';

@Module({
  // imports: [PrismaModule], // Não precisa importar aqui se PrismaModule for global
  controllers: [SalaController],
  providers: [SalaService],
})
export class SalaModule {}