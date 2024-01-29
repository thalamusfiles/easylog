export const isCPFSize = (document: string): boolean => {
  return document.replace(/[/.-]*/g, '').length === 11;
};
