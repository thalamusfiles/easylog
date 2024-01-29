import { action, makeObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';
import { ErrosAsList, getFormExceptionErrosToObject } from '../../../commons/error';
import { notify } from '../../../components/Notification';
import type { ErrorListRecord } from '../../../commons/types/ErrorListRecord';
import { SearchDataSource } from '../../../datasources/search';
import type { Indexes } from '../../../datasources/search';

export class AllLogsCtrl {
  constructor() {
    // Modifica classe pra ser observável
    makeObservable(this);
  }

  // AllLogsCtrl
  @observable filterIndex = '*';
  @observable filterContains = '';

  @observable waiting: boolean | null = null;
  @observable indexes: Indexes = [];
  @observable response: any[] | null = null;
  // Erros
  @observable erroMessages: string[] = [];
  @observable erros: ErrorListRecord = {};

  @action
  handleClear = () => {
    this.filterContains = '';
    this.response = null;
  };

  @action
  handleContains = (e: any) => {
    this.filterContains = e.target.value;
  };

  @action
  findIndexes = () => {
    new SearchDataSource()
      .findIndexes()
      .then((response) => {
        this.indexes = response?.data;
      })
      .catch((ex) => {
        this.notifyExeption(ex);
      });
  };

  @action
  search = () => {
    if (this.waiting) return;

    this.waiting = true;
    this.erroMessages = [];
    this.erros = {};

    new SearchDataSource()
      .search(this.filterIndex)
      .then((response) => {
        this.waiting = false;
        console.log(response?.data)
        this.response = response?.data;
      })
      .catch((ex) => {
        this.waiting = false;
        this.response = null;

        const data = ex.response?.data;
        [this.erroMessages, this.erros] = getFormExceptionErrosToObject(data, { splitByConstraints: true }) as ErrosAsList;

        this.notifyExeption(ex);
      });
  };

  __!: Function;
  notifyExeption = (ex: any) => {
    const status = ex.response?.status;
    const message = ex.message;
    if ([400].includes(status)) return;
    if ([404].includes(status)) {
      notify.warn(`${status}: ${message}`);
    } else if ([400, 500].includes(status)) {
      notify.danger(`${status}: ${message}`);
    } else {
      notify.danger(message);
    }
  };
}

export const AllLogsContext = createContext({} as AllLogsCtrl);
export const AllLogsProvider = AllLogsContext.Provider;
export const useAllLogsCtrlStore = (): AllLogsCtrl => useContext(AllLogsContext);
