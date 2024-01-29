import env from '../.env';
import Apis from '../datasources/apis';

const apiConfigure = (accessToken: string | null) => {
  const url = env.BASE_URL || window.location.origin.replace(/:[^\\/].*/, '');
  const port = env.BASE_PORT !== '80' ? env.BASE_PORT : '';

  Apis.configureConsumer(url, port);
  if (accessToken) {
    Apis.setGlobalAuthorizationToken(accessToken);
  }
};

export default apiConfigure;
