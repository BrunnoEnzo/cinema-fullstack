// src/sessao/sessao.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSessaoDto } from './dto/create-sessao.dto';
import { UpdateSessaoDto } from './dto/update-sessao.dto';
import { Sessao } from '../../generated/prisma';

@Injectable()
export class SessaoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSessaoDto: CreateSessaoDto): Promise<Sessao> {
    // Verificar se o filme existe
    const filme = await this.prisma.filme.findUnique({
      where: { id: createSessaoDto.filmeId },
    });
    if (!filme) {
      throw new NotFoundException(`Filme com ID ${createSessaoDto.filmeId} não encontrado.`);
    }

    // Verificar se a sala existe
    const sala = await this.prisma.sala.findUnique({
      where: { id: createSessaoDto.salaId },
    });
    if (!sala) {
      throw new NotFoundException(`Sala com ID ${createSessaoDto.salaId} não encontrada.`);
    }

    // O Prisma automaticamente converte a string dataHora para um objeto Date
    // e lida com a associação pelos IDs
    return this.prisma.sessao.create({
      data: {
        filmeId: createSessaoDto.filmeId,
        salaId: createSessaoDto.salaId,
        dataHora: new Date(createSessaoDto.dataHora), // Converte a string para Date
        preco: createSessaoDto.preco,
        idioma: createSessaoDto.idioma,
        formato: createSessaoDto.formato,
      },
      // Inclui os detalhes do filme e da sala na resposta
      include: {
        filme: {
          select: { titulo: true } // Seleciona apenas o título do filme
        },
        sala: {
          select: { nomeSala: true } // Seleciona apenas o nome da sala
        },
      },
    });
  }

  async findAll(): Promise<Sessao[]> {
    return this.prisma.sessao.findMany({
      include: {
        filme: {
          select: { titulo: true, genero: true }
        },
        sala: {
          select: { nomeSala: true, tipo: true }
        },
      },
    });
  }

  async findOne(id: number): Promise<Sessao | null> {
    const sessao = await this.prisma.sessao.findUnique({
      where: { id },
      include: {
        filme: {
          select: { titulo: true, genero: true }
        },
        sala: {
          select: { nomeSala: true, tipo: true }
        },
      },
    });
    if (!sessao) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada.`);
    }
    return sessao;
  }

  async update(id: number, updateSessaoDto: UpdateSessaoDto): Promise<Sessao> {
    const sessaoExists = await this.prisma.sessao.findUnique({ where: { id } });
    if (!sessaoExists) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada para atualização.`);
    }

    // Verificar se filmeId ou salaId foram passados para update e se existem
    if (updateSessaoDto.filmeId) {
      const filme = await this.prisma.filme.findUnique({ where: { id: updateSessaoDto.filmeId } });
      if (!filme) {
        throw new NotFoundException(`Filme com ID ${updateSessaoDto.filmeId} não encontrado.`);
      }
    }
    if (updateSessaoDto.salaId) {
      const sala = await this.prisma.sala.findUnique({ where: { id: updateSessaoDto.salaId } });
      if (!sala) {
        throw new NotFoundException(`Sala com ID ${updateSessaoDto.salaId} não encontrada.`);
      }
    }

    const data: any = { ...updateSessaoDto };
    if (updateSessaoDto.dataHora) {
      data.dataHora = new Date(updateSessaoDto.dataHora); // Converte para Date se presente
    }

    return this.prisma.sessao.update({
      where: { id },
      data,
      include: { // Inclui os detalhes do filme e da sala na resposta
        filme: { select: { titulo: true } },
        sala: { select: { nomeSala: true } },
      },
    });
  }

  async remove(id: number): Promise<Sessao> {
    const sessaoExists = await this.prisma.sessao.findUnique({ where: { id } });
    if (!sessaoExists) {
      throw new NotFoundException(`Sessão com ID ${id} não encontrada para remoção.`);
    }
    return this.prisma.sessao.delete({
      where: { id },
      include: { // Opcional: incluir os dados da sessão deletada
        filme: { select: { titulo: true } },
        sala: { select: { nomeSala: true } },
      },
    });
  }
}