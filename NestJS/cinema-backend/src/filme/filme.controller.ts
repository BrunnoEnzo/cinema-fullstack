// src/filme/filme.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe, // Para validar que o ID é um número
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FilmeService } from './filme.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Controller('filmes') // Define o prefixo da rota para /filmes
export class FilmeController {
  constructor(private readonly filmeService: FilmeService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createFilmeDto: CreateFilmeDto) {
    // O ValidationPipe (que configuraremos globalmente) validará o DTO
    return this.filmeService.create(createFilmeDto);
  }

  @Get()
  findAll() {
    return this.filmeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    // ParseIntPipe converte e valida se o 'id' é um número
    return this.filmeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFilmeDto: UpdateFilmeDto,
  ) {
    return this.filmeService.update(id, updateFilmeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content em caso de sucesso
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.filmeService.remove(id);
  }
}