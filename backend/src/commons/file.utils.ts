import logConfig from 'src/config/log.config';

export const writerByDateTest = /.*\/?(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})_\d+/;

export function getWriterDateFromFileName(path: string): Date {
  const [, year, month, day, hour, min, sec] = path.match(writerByDateTest);
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(min), parseInt(sec));
}

export function resolveDirname(index: string) {
  return `${logConfig.FOLDER_PATH}/${index}/raw`;
}
