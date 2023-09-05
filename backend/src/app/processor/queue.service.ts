import { Injectable, Logger, Scope } from '@nestjs/common';
import ChainSemaphore, { DoneFunction } from 'src/commons/chain.semaphore';

type PersistData = any;

type QueueProps = {
  semaphore: ChainSemaphore;
  //Filas de dados a serem processados
  data: PersistData;
  //Filas de dados em processamento
  inProgress: PersistData;
  next: number;
};

function createQueue(): QueueProps {
  return {
    semaphore: new ChainSemaphore(),
    data: [] as Array<PersistData>,
    inProgress: [] as Array<PersistData>,
    next: 0,
  };
}

@Injectable({ scope: Scope.DEFAULT })
export class QueueService {
  private readonly logger = new Logger(QueueService.name);

  /**
   * Filas de dados a serem processados
   */
  private readonly queues: Record<string, QueueProps> = {
    persist: createQueue(),
  };

  constructor() {
    this.logger.log('Starting');
  }

  /**
   * Adiciona a fila, com proteção multi promise
   * @param data
   */
  async queue(name: string, data: Record<string, PersistData>): Promise<void> {
    const queue = this.queues[name];
    await queue.semaphore.take((next) => this.persistData(name, data, next));
  }

  /**
   * Adiciona a fila
   * @param name
   * @param data
   * @param next
   */
  private async persistData(name: string, data: Record<string, PersistData>, next: DoneFunction): Promise<void> {
    const queue = this.queues[name];
    try {
      await new Promise((resolve) => setTimeout(resolve, 10000));

      queue.data.push(data);
    } catch (ex) {
      this.logger.error(ex);
    }

    next();
  }

  /**
   * Remove da fila
   * @param name
   * @returns
   */
  dequeue(name: string): PersistData | undefined {
    const queue = this.queues[name];

    // Caso processou todos os dados em progresso
    if (queue.next >= length) {
      // Coleta os próximos itens a serem processados
      if (queue.data.length) {
        queue.inProgress = queue.data;
        queue.data = [];
      } else {
        queue.inProgress = [];
      }
      queue.next = 0;

      if (!queue.inProgress.length) {
        return undefined;
      }
    }

    return queue.inProgress[queue.next++];
  }

  //
  // Atalhos de chamadas
  //

  async queuePersist(data: Record<string, PersistData>): Promise<void> {
    await this.queue('persist', data);
  }

  dequeuePersistData(): PersistData | undefined {
    return this.dequeue('persist');
  }
}
