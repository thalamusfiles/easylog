import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Endpoint from './endpoints';

class RegisterApisConfigure {
  token = '';
  ApiSearch!: AxiosInstance;

  /**
   * Intercepta todas as requisições
   * @param config
   */
  requestInterceptors = (config: any) => {
    if (this.token) config.headers.Authorization = 'Bearer ' + this.token;
    return config;
  };

  axiosStart = (config: AxiosRequestConfig): AxiosInstance => {
    const api = axios.create(config);
    api.interceptors.request.use(this.requestInterceptors);
    return api;
  };

  initApis = () => {
    this.ApiSearch = this.axiosStart({
      baseURL: Endpoint.eSearch!,
      timeout: Endpoint.timeout,
    });
  };

  setGlobalAuthorizationToken = (newToken: string): void => {
    this.token = newToken;
  };

  configureConsumer = (baseUrl?: string, basePort?: string): void => {
    Endpoint.configureEndpoint(baseUrl, basePort);
    this.initApis();
  };
}

const Apis = new RegisterApisConfigure();
export default Apis;
