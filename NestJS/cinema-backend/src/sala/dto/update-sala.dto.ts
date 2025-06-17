// src/sala/dto/update-sala.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';

export class UpdateSalaDto {
  @IsNotEmpty({ message: 'O nome da sala não pode ser vazio.' })
  @IsString({ message: 'O nome da sala deve ser uma string.' })
  @MaxLength(50, { message: 'O nome da sala não pode ter mais de 50 caracteres.' })
  nomeSala: string;

  @IsNotEmpty({ message: 'A capacidade da sala não pode ser vazia.' })
  @IsInt({ message: 'A capacidade deve ser um número inteiro.' })
  @Min(1, { message: 'A capacidade mínima da sala deve ser 1.' })
  capacidade: number;

  @IsNotEmpty({ message: 'O tipo da sala não pode ser vazio.' })
  @IsString({ message: 'O tipo da sala deve ser uma string.' })
  @MaxLength(30, { message: 'O tipo da sala não pode ter mais de 30 caracteres.' })
  tipo: string;
}