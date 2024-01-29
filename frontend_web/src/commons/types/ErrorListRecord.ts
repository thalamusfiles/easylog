/**
 * Record com lista de erros
 * indexado pelo nome de campo
 * e com uma lista de mensagens de erros
 */
export type ErrorListRecord = Record<string, string[] | null>;
