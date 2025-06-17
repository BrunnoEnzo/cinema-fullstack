// src/filme/dto/update-filme.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';

export class UpdateFilmeDto {
  @IsNotEmpty({ message: 'O título não pode ser vazio.' })
  @IsString({ message: 'O título deve ser uma string.' })
  titulo: string;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia.' })
  @IsString({ message: 'A descrição deve ser uma string.' })
  descricao: string;

  @IsNotEmpty({ message: 'O gênero não pode ser vazio.' })
  @IsString({ message: 'O gênero deve ser uma string.' })
  genero: string;

  @IsNotEmpty({ message: 'A classificação não pode ser vazia.' })
  @IsInt({ message: 'A classificação deve ser um número inteiro.' })
  @Min(0, { message: 'A classificação deve ser um número positivo.' })
  classificacao: number;

  @IsNotEmpty({ message: 'A duração não pode ser vazia.' })
  @IsInt({ message: 'A duração deve ser um número inteiro (em minutos).' })
  @Min(1, { message: 'A duração mínima deve ser de 1 minuto.' })
  duracao: number;

  @IsNotEmpty({ message: 'A data de estreia não pode ser vazia.' })
  @IsDateString({}, { message: 'Forneça uma data de estreia válida no formato YYYY-MM-DD.' })
  dataEstreia: string;
}