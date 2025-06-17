// src/venda/venda.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendaDto } from './dto/create-venda.dto';
import { UpdateVendaDto } from './dto/update-venda.dto';
import { Venda } from '../../generated/prisma';

@Injectable()
export class VendaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVendaDto: CreateVendaDto): Promise<Venda> {
    // Verificar se a sessão existe
    const sessao = await this.prisma.sessao.findUnique({
      where: { id: createVendaDto.sessaoId },
    });
    if (!sessao) {
      throw new NotFoundException(`Sessão com ID ${createVendaDto.sessaoId} não encontrada.`);
    }

    return this.prisma.venda.create({
      data: {
        sessaoId: createVendaDto.sessaoId,
        nomeCliente: createVendaDto.nomeCliente,
        cpf: createVendaDto.cpf,
        assento: createVendaDto.assento,
        tipoPagamento: createVendaDto.tipoPagamento,
      },
      include: { // Inclui os detalhes da sessão na resposta
        sessao: {
          select: { dataHora: true, filme: { select: { titulo: true } }, sala: { select: { nomeSala: true } } }
        },
      },
    });
  }

  async findAll(): Promise<Venda[]> {
    return this.prisma.venda.findMany({
      include: { // Inclui os detalhes da sessão na resposta
        sessao: {
          select: { dataHora: true, filme: { select: { titulo: true } }, sala: { select: { nomeSala: true } } }
        },
      },
    });
  }

  async findOne(id: number): Promise<Venda | null> {
    const venda = await this.prisma.venda.findUnique({
      where: { id },
      include: { // Inclui os detalhes da sessão na resposta
        sessao: {
          select: { dataHora: true, filme: { select: { titulo: true } }, sala: { select: { nomeSala: true } } }
        },
      },
    });
    if (!venda) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada.`);
    }
    return venda;
  }

  async update(id: number, updateVendaDto: UpdateVendaDto): Promise<Venda> {
    const vendaExists = await this.prisma.venda.findUnique({ where: { id } });
    if (!vendaExists) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada para atualização.`);
    }

    if (updateVendaDto.sessaoId) {
      const sessao = await this.prisma.sessao.findUnique({ where: { id: updateVendaDto.sessaoId } });
      if (!sessao) {
        throw new NotFoundException(`Sessão com ID ${updateVendaDto.sessaoId} não encontrada.`);
      }
    }

    return this.prisma.venda.update({
      where: { id },
      data: updateVendaDto,
      include: { // Inclui os detalhes da sessão na resposta
        sessao: {
          select: { dataHora: true, filme: { select: { titulo: true } }, sala: { select: { nomeSala: true } } }
        },
      },
    });
  }

  async remove(id: number): Promise<Venda> {
    const vendaExists = await this.prisma.venda.findUnique({ where: { id } });
    if (!vendaExists) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada para remoção.`);
    }
    return this.prisma.venda.delete({
      where: { id },
      include: { // Opcional: incluir os dados da venda deletada
        sessao: {
          select: { dataHora: true, filme: { select: { titulo: true } }, sala: { select: { nomeSala: true } } }
        },
      },
    });
  }
}