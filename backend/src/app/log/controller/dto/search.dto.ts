import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import LogRawData from 'src/commons/type/lograwdata';
import { FilterQuery } from 'src/commons/type/whereoperator';

// DTO para busca de dados
@Exclude()
export class LogSearchDto {
  @ApiProperty({ description: 'Filtros' })
  @Expose()
  @IsOptional()
  where?: FilterQuery<LogRawData>;
}
