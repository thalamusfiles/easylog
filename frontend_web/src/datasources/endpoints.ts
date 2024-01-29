class EndpointsConfigure {
  url = null as string | null;
  port = null as string | null;
  base = null as string | null;
  timeout = 10000;

  // Auth
  eAuth = null as string | null;
  eAuthIam = '/iam';
  eAuthToken = '/token';
  eAuthLogout = '/logout';
  // API TypeKeyValue
  eSearch = '';
  eSearchIndexes = `/indexes`;

  configureEndpoint = (baseUrl: string = 'localhost', basePort: string = '3000') => {
    const baseEndpoint = basePort ? `${baseUrl}:${basePort}` : baseUrl;

    // Auth
    const eAuth = `${baseEndpoint}/auth`;
    // Api
    const eSearch = `${baseEndpoint}/log`;

    this.url = baseUrl;
    this.port = basePort;
    this.base = baseEndpoint;
    this.eAuth = eAuth;
    this.eSearch = eSearch;
  };
}

const Endpoints = new EndpointsConfigure();

export default Endpoints;
