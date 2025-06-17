// src/sessao/sessao.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SessaoService } from './sessao.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';

@Controller('sessoes') // Define o prefixo da rota para /sessoes
export class SessaoController {
  constructor(private readonly sessaoService: SessaoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSessaoDto: CreateSessaoDto) {
    return this.sessaoService.create(createSessaoDto);
  }

  @Get()
  findAll() {
    return this.sessaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sessaoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessaoDto: UpdateSessaoDto,
  ) {
    return this.sessaoService.update(id, updateSessaoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content em caso de sucesso
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sessaoService.remove(id);
  }
}