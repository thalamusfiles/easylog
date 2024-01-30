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
  @observable page = 1;
  @observable perPage = 250;
  @observable filterIndex = '';
  @observable filters = '';

  @observable waiting: boolean | null = null;
  @observable indexes: Indexes = [];
  @observable response: any[] | null = null;
  // Erros
  @observable erroMessages: string[] = [];
  @observable erros: ErrorListRecord = {};

  @action
  handleClear = () => {
    this.filterIndex = '';
    this.filters = `{ "where": {
      "data": {}
}}`;
    this.response = null;
  };

  @action
  handleIndex = (e: any) => {
    this.filterIndex = e.target.value;
  };

  @action
  handleContains = (e: any) => {
    this.filters = e.target.value;
  };

  @action
  handlePreviewsPage = () => {
    if (this.page) {
      this.page--;
    }
    this.search();
  };

  @action
  handleNextPage = () => {
    this.page++;
    this.search();
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
  handleSearch = () => {
    this.page = 1;
    this.search();
  };

  @action
  search = () => {
    if (this.waiting) return;
    if (!this.filterIndex) return;

    this.waiting = true;
    this.erroMessages = [];
    this.erros = {};

    let filters;
    try {
      filters = JSON.parse(this.filters);
      filters.page = this.page;
      filters.perPage = this.perPage;
    } catch (ex) {
      this.notifyExeption(ex);
      this.waiting = false;
      return;
    }

    new SearchDataSource()
      .search(this.filterIndex, filters)
      .then((response) => {
        this.waiting = false;
        this.response = response?.data || [];
      })
      .catch((ex) => {
        this.waiting = false;
        this.response = [];

        const data = ex.response?.data;
        [this.erroMessages, this.erros] = getFormExceptionErrosToObject(data, { splitByConstraints: true }) as ErrosAsList;

        this.notifyExeption(ex);
      });
  };

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
