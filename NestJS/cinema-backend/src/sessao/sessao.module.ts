// src/sessao/sessao.module.ts
import { Module } from '@nestjs/common';
import { SessaoService } from './sessao.service';
import { SessaoController } from './sessao.controller';

@Module({
  // imports: [PrismaModule], // Não precisa importar aqui se PrismaModule for global
  controllers: [SessaoController],
  providers: [SessaoService],
})
export class SessaoModule {}