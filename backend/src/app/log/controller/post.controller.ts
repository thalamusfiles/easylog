import { Controller, Logger, Post, Body, UsePipes } from '@nestjs/common';
import { RegisterValidationPipe } from '../../../commons/validation.pipe';
import { ApiOperation } from '@nestjs/swagger';

@Controller('log')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor() {
    this.logger.log('Starting');
  }

  /**
   * Registra o log de dados para processamento e consulta
   */
  @ApiOperation({
    tags: ['Log'],
    summary: 'Registra o log de dados para processamento e consulta',
  })
  @Post('/{index}')
  @UsePipes(new RegisterValidationPipe())
  async findBRCNAES(@Body() body: any): Promise<any> {
    return body;
  }
}
