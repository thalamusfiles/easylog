/**
 * Chain Of Responsability Semaphore
 */

/**
 * Função que finaliza e chama a próximo item da lista
 */
export type DoneFunction = () => Promise<void>;

/**
 * Tipo de função aceita
 */
export type ArrowFunction = (done: DoneFunction) => void;

export default class ChainSemaphore {
  private fns: Array<ArrowFunction> = [];
  private active: number = 0;

  get remaining() {
    return this.fns.length;
  }

  get isActive() {
    return this.active;
  }

  async take(fn: ArrowFunction): Promise<void> {
    this.fns.push(fn);

    await this.try();
  }

  private async done(): Promise<void> {
    this.active -= 1;
    await this.try();
  }

  private async try(): Promise<void> {
    if (this.fns.length === 0) return;

    const fn = await this.fns.shift();
    this.active += 1;

    if (fn) {
      await fn(this.done.bind(this));
    }
  }
}
