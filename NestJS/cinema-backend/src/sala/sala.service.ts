// src/sala/sala.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { Sala } from '../../generated/prisma'; // Importe o tipo Sala do Prisma

@Injectable()
export class SalaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSalaDto: CreateSalaDto): Promise<Sala> {
    return this.prisma.sala.create({
      data: createSalaDto,
    });
  }

  async findAll(): Promise<Sala[]> {
    return this.prisma.sala.findMany();
  }

  async findOne(id: number): Promise<Sala | null> {
    const sala = await this.prisma.sala.findUnique({
      where: { id },
    });
    if (!sala) {
      throw new NotFoundException(`Sala com ID ${id} não encontrada.`);
    }
    return sala;
  }

  async update(id: number, updateSalaDto: UpdateSalaDto): Promise<Sala> {
    const salaExists = await this.prisma.sala.findUnique({ where: { id } });
    if (!salaExists) {
      throw new NotFoundException(`Sala com ID ${id} não encontrada para atualização.`);
    }

    return this.prisma.sala.update({
      where: { id },
      data: updateSalaDto,
    });
  }

  async remove(id: number): Promise<Sala> {
    const salaExists = await this.prisma.sala.findUnique({ where: { id } });
    if (!salaExists) {
      throw new NotFoundException(`Sala com ID ${id} não encontrada para remoção.`);
    }
    return this.prisma.sala.delete({
      where: { id },
    });
  }
}