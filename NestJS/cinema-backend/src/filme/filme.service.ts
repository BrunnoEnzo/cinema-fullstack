// src/filme/filme.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { Filme } from '../../generated/prisma';

@Injectable()
export class FilmeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto): Promise<Filme> {
    // Aqui você pode adicionar lógica de negócio antes de criar o filme, se necessário
    return this.prisma.filme.create({
      data: {
        ...createFilmeDto,
        dataEstreia: new Date(createFilmeDto.dataEstreia), // Converte a string para Date
      },
    });
  }

  async findAll(): Promise<Filme[]> {
    return this.prisma.filme.findMany();
  }

  async findOne(id: number): Promise<Filme | null> {
    const filme = await this.prisma.filme.findUnique({
      where: { id },
    });
    if (!filme) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado.`);
    }
    return filme;
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto): Promise<Filme> {
    const filmeExists = await this.prisma.filme.findUnique({ where: { id } });
    if (!filmeExists) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado para atualização.`);
    }

    const data: any = { ...updateFilmeDto };
    if (updateFilmeDto.dataEstreia) {
      data.dataEstreia = new Date(updateFilmeDto.dataEstreia); // Converte para Date se presente
    }

    return this.prisma.filme.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Filme> {
    const filmeExists = await this.prisma.filme.findUnique({ where: { id } });
    if (!filmeExists) {
      throw new NotFoundException(`Filme com ID ${id} não encontrado para remoção.`);
    }
    return this.prisma.filme.delete({
      where: { id },
    });
  }
}