import moment from 'moment';
import numeral from 'numeral';

export const formatBoolean = (value: string | number | boolean): string => {
  return value ? 'Sim' : 'Não';
};

export const formatInteger = (number: string | number): string => {
  const f = numeral(number);
  return f.format();
};

export const formatDecimal = (number: string | number /*, decimals: number | null = null*/): string => {
  const f = numeral(number);
  return f.format();
};

//Todo: Alterar formato de datas ao alterar idioma
export const formatDatetime = (number: string | moment.Moment /*, decimals: number | null = null*/): string => {
  const f = moment(number);
  return f.isValid() ? f.format('L LT') : '';
};

//Todo: Alterar formato de datas ao alterar idioma
export const formatDate = (number: string | moment.Moment): string => {
  const f = moment(number);
  return f.isValid() ? f.format('L') : '';
};

export const formatTime = (number: string | moment.Moment): string => {
  const f = moment(number);
  return f.isValid() ? f.format('LT') : '';
};

export const formatCurrency = (number: string | number /*, decimals: number | null = null*/, currency: string): string => {
  return currency + ' ' + formatDecimal(number);
};
