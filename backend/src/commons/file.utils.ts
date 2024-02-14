import logConfig from 'src/config/log.config';

export function resolveDirname(index: string) {
  return `${logConfig.FOLDER_PATH}/${index}/raw`;
}
