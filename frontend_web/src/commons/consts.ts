import { IconName } from '@fortawesome/fontawesome-svg-core';

export const brGovStatusCodeActive = 2;

export const ColorsDef = {
  // Listagem
  defaultBadgeVariant: 'info',
  //
  userVariant: 'info',
  addressVariant: 'outline-danger',
};

export const IconsDef = {
  // Actions
  login: 'door-open' as IconName,
  new: 'plus' as IconName,
  save: 'save' as IconName,
  goBack: 'arrow-left' as IconName,
  remove: 'times' as IconName,
  add: 'plus' as IconName,
  edit: 'edit' as IconName,
  delete: 'trash' as IconName,
  upload: 'upload' as IconName,
  refresh: 'sync' as IconName,
  close: 'times' as IconName,
  clear: 'broom' as IconName,
  reset: 'undo' as IconName,
  filter: 'filter' as IconName,
  // Modules
  reports: 'chart-bar' as IconName,
  chartBar: 'chart-simple' as IconName,
  chartLine: 'chart-line' as IconName,
  management: 'tasks' as IconName,
  // Apis
  attachment: 'file' as IconName,
  user: ['user', 'building'] as Array<IconName>,
  contact: 'address-book' as IconName,
  personLegal: 'building' as IconName,
  personNatural: 'user' as IconName,
  partner: 'handshake' as IconName,
  zipcode: 'map-location-dot' as IconName,
  swagger: 'code' as IconName,
  docs: 'file-text' as IconName,
  // Atividades
  tokensActive: 'mobile-alt' as IconName,
  history: 'history' as IconName,
  // Outros
  language: 'earth-americas' as IconName,
};

//Constantes e identificadores de armazenamentos locais
const lsKey = 'register_v001';
export const localStorageDef = {
  key: lsKey,
  // User
  userContextKey: `${lsKey}_user`, //Identificador de armazenamento do usuário
  tokenKey: `${lsKey}_token`, //Identificador de armazenamento do usuário
  expiresIn: `${lsKey}_expires_in`, //Identificador de armazenamento do usuário
};

//Qauntidade de itens por página
export const defaultPageSize = 50;
