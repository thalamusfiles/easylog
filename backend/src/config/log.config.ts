const defaultLogConfig = {
  LOG_NODE_ID: '01',
  LOG_FOLDER_PATH: 'tmp/logs',
};

const logConfig = {
  NODE_ID: process.env.LOG_NODE_ID || defaultLogConfig.LOG_NODE_ID,
  // Caminho para salvar os logs de registros
  FOLDER_PATH: process.env.LOG_FOLDER_PATH || defaultLogConfig.LOG_FOLDER_PATH,
  // Tamanho máximo do arquivo
  MAX_FILE_SIZE: 5 * 1024 * 1024,
};

export default logConfig;
