import * as XLSX from 'xlsx';

export const exportXLS = (contents: Array<any>, filename: string) => {
  const ws = XLSX.utils.json_to_sheet(contents);
  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  XLSX.writeFile(wb, filename + '.xlsx');
};

export const importarXLS = (data: any, headerAsColumn: boolean = true, type: 'binary' = 'binary') => {
  var workbook = XLSX.read(data, { type: type });
  var sheet_name_list = workbook.SheetNames;
  return XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], headerAsColumn ? undefined : { header: 1 });
};

const ACCENT_STRINGS = 'ŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ';
const NO_ACCENT_STRINGS = 'SOZsozYYuAAAAAAACEEEEEIIIIIDNOOOOOOUUUUYsaaaaaaaceeeeeiiiiionoooooouuuuyy';
const FROM = decodeURIComponent(ACCENT_STRINGS).split('');

export const toIlikeRegex = (text: string, toregexp: boolean = true): string | RegExp => {
  text = text || '';
  let regex: any = {};
  //Criar um array de letras similares. Ex a: aáã
  NO_ACCENT_STRINGS.split('').forEach((value: any, idx: number) => {
    if (regex[value]) regex[value] += FROM[idx];
    else regex[value] = value;
  });
  //Busca no texto estas letras e substitui por todas as possibilidades
  Object.entries(regex).forEach(([key, value]) => {
    text = text.replace(new RegExp(`[${value}]`), `_${key}_`);
  });
  Object.entries(regex).forEach(([key, value]) => {
    text = text.replace(new RegExp(`_${key}_`), `[${value}]`);
  });

  return toregexp ? new RegExp(`.*${text}.*`, 'i') : `/.*${text}.*/i`;
};
