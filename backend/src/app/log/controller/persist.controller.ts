import { Controller, Logger, Param, Post, Body, UsePipes, Query } from '@nestjs/common';
import { RegisterValidationPipe } from '../../../commons/validation.pipe';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { QueueService } from 'src/app/processor/queue.service';
import { PersistService } from 'src/app/processor/persist.service';
import { LogPersistDto } from './dto/persist.dto';

@Controller('log')
export class PersistController {
  private readonly logger = new Logger(PersistController.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly persistService: PersistService,
  ) {
    this.logger.log('Starting');
  }

  /**
   * Registra o log de dados
   */
  @ApiOperation({ tags: ['Log'], summary: 'Registra o log de dados' })
  @ApiParam({ name: 'index', description: 'Indice para agrupamento dos dados' })
  @Post('/:index')
  @UsePipes(new RegisterValidationPipe())
  async persist(@Param('index') index: string, @Query() query: LogPersistDto, @Body() body: any): Promise<any> {
    this.logger.log('persist');

    const data = this.formatData(index, body);
    if (query?.async === 'true') {
      this.queueService //
        .queuePersist(data)
        .then(() => this.persistService.flush());
    } else {
      await this.queueService.queuePersist(data);
      await this.persistService.flush();
    }

    return data;
  }

  private formatData(index: string, body: any) {
    return {
      index,
      time: new Date(),
      body,
    };
  }
}
