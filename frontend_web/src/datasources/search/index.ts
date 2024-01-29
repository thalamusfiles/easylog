import { AxiosResponse } from 'axios';
import Apis from '../apis';
import Endpoints from '../endpoints';

export type Index = { name: string };
export type Indexes = Array<Index>;

interface SearchDataSourceI {
  // Busca os indices
  findIndexes(): Promise<AxiosResponse<Indexes>>;
  // Busca os logs
  search(index: string): Promise<AxiosResponse<any>>;
}

export class SearchDataSource implements SearchDataSourceI {
  async findIndexes(): Promise<AxiosResponse<Indexes>> {
    return await Apis.ApiSearch.get(Endpoints.eSearchIndexes);
  }
  async search(index: string): Promise<AxiosResponse<Indexes>> {
    return await Apis.ApiSearch.post(`${Endpoints.eSearch}/${index}/_search`);
  }
}
