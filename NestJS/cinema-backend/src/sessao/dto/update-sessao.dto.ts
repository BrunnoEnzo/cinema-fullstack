// src/sessao/dto/update-sessao.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsNumber,
  IsDateString,
  Min,
} from 'class-validator';

export class UpdateSessaoDto {
  @IsNotEmpty({ message: 'O ID do filme não pode ser vazio.' })
  @IsInt({ message: 'O ID do filme deve ser um número inteiro.' })
  @Min(1, { message: 'O ID do filme deve ser um número positivo.' })
  filmeId: number;

  @IsNotEmpty({ message: 'O ID da sala não pode ser vazio.' })
  @IsInt({ message: 'O ID da sala deve ser um número inteiro.' })
  @Min(1, { message: 'O ID da sala deve ser um número positivo.' })
  salaId: number;

  @IsNotEmpty({ message: 'A data e hora da sessão não pode ser vazia.' })
  @IsDateString(
    {},
    {
      message:
        'Forneça uma data e hora válidas para a sessão (ex: 2025-06-04T19:00:00).',
    },
  )
  dataHora: string;

  @IsNotEmpty({ message: 'O preço não pode ser vazio.' })
  @IsNumber({}, { message: 'O preço deve ser um número.' })
  @Min(0.01, { message: 'O preço deve ser maior que zero.' })
  preco: number;

  @IsNotEmpty({ message: 'O idioma não pode ser vazio.' })
  @IsString({ message: 'O idioma deve ser uma string.' })
  idioma: string;

  @IsNotEmpty({ message: 'O formato não pode ser vazio.' })
  @IsString({ message: 'O formato deve ser uma string.' })
  formato: string;
}