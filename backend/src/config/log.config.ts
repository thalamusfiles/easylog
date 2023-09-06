const defaultLogConfig = {
  LOG_NODE_ID: '01',
  LOG_FOLDER_PATH: 'tmp/logs',
  LOG_MAX_FILE_SIZE: 100 * 1024 * 1024,
  LOG_LAZY: false,
};

const logConfig = {
  NODE_ID: process.env.LOG_NODE_ID || defaultLogConfig.LOG_NODE_ID,

  // Caminho para salvar os logs de registros
  FOLDER_PATH: process.env.LOG_FOLDER_PATH || defaultLogConfig.LOG_FOLDER_PATH,

  // Tamanho máximo do arquivo
  MAX_FILE_SIZE: parseInt(process.env.LOG_MAX_FILE_SIZE) || defaultLogConfig.LOG_MAX_FILE_SIZE,

  // Abrir o arquivo a ser persistido no momento do registro ser salvo
  LAZY: process.env?.LOG_LAZY === 'true' || defaultLogConfig.LOG_LAZY,
};

export default logConfig;
