import { Controller, Logger, Param, Body, UsePipes, Get, Query, Post } from '@nestjs/common';
import { RegisterValidationPipe } from '../../../commons/validation.pipe';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { LogSearchDto } from './dto/search.dto';
import { SearchService } from 'src/app/processor/search.service';

@Controller('log')
export class SearchController {
  private readonly logger = new Logger(SearchController.name);

  constructor(private readonly searchService: SearchService) {
    this.logger.log('Starting');
  }

  /**
   * Coleta os logs de dados
   */
  @ApiOperation({ tags: ['Log'], summary: 'Coleta os índices existentes' })
  @Get('/indexes')
  @UsePipes(new RegisterValidationPipe())
  async indexes(): Promise<any> {
    this.logger.log('indexes');

    const indexes = await this.searchService.getIndiceFolders();
    return indexes.map((index) => ({ name: index }));
  }

  /**
   * Coleta os logs de dados
   */
  @ApiOperation({ tags: ['Log'], summary: 'Coleta os logs de dados' })
  @ApiParam({ name: 'index', description: 'Indice para agrupamento dos dados' })
  @Get('/:index')
  @UsePipes(new RegisterValidationPipe())
  async search(@Param('index') index: string, @Query() { where, ...options }: LogSearchDto): Promise<any> {
    this.logger.log('search');

    const itens = await this.searchService.seach(index, where, options);
    return itens;
  }

  /**
   * Coleta os logs de dados
   */
  @ApiOperation({ tags: ['Log'], summary: 'Coleta os logs de dados' })
  @ApiParam({ name: 'index', description: 'Indice para agrupamento dos dados' })
  @Post('/:index/_search')
  @UsePipes(new RegisterValidationPipe())
  async searchFromPost(@Param('index') index: string, @Body() { where, ...options }: LogSearchDto): Promise<any> {
    this.logger.log('searchFromPost');

    const itens = await this.searchService.seach(index, where, options);
    return itens;
  }
}
