import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

// DTO para busca de dados
@Exclude()
export class LogSearchDto {
  @ApiProperty({ description: 'Filtros' })
  @Expose()
  @IsOptional()
  where?: Record<string, any>;
}
