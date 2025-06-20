// src/venda/dto/update-venda.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';

export class UpdateVendaDto {
  @IsNotEmpty({ message: 'O ID da sessão não pode ser vazio.' })
  @IsInt({ message: 'O ID da sessão deve ser um número inteiro.' })
  @Min(1, { message: 'O ID da sessão deve ser um número positivo.' })
  sessaoId: number;

  @IsNotEmpty({ message: 'O nome do cliente não pode ser vazio.' })
  @IsString({ message: 'O nome do cliente deve ser uma string.' })
  @MaxLength(100, { message: 'O nome do cliente não pode ter mais de 100 caracteres.' })
  nomeCliente: string;

  @IsNotEmpty({ message: 'O CPF não pode ser vazio.' })
  @IsString({ message: 'O CPF deve ser uma string.' })
  @MaxLength(14, { message: 'O CPF não pode ter mais de 14 caracteres.' })
  cpf: string;

  @IsNotEmpty({ message: 'O assento não pode ser vazio.' })
  @IsString({ message: 'O assento deve ser uma string.' })
  @MaxLength(10, { message: 'O assento não pode ter mais de 10 caracteres.' })
  assento: string;

  @IsNotEmpty({ message: 'O tipo de pagamento não pode ser vazio.' })
  @IsString({ message: 'O tipo de pagamento deve ser uma string.' })
  @MaxLength(30, { message: 'O tipo de pagamento não pode ter mais de 30 caracteres.' })
  tipoPagamento: string;
}