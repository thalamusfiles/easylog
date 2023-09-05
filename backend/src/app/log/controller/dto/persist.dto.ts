import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBooleanString, IsOptional } from 'class-validator';

// DTO find User
@Exclude()
export class LogPersistDto {
  @ApiProperty({ description: 'Registrar de forma assincrona?' })
  @Expose()
  @IsBooleanString()
  @IsOptional()
  async?: 'true' | 'false';
}
