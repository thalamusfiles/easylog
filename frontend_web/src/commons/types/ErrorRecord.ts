/**
 * Record com lista de erros
 * indexado pelo nome de campo
 * e com um único msg de erro
 */
export type ErrorRecord = Record<string, string | null>;
