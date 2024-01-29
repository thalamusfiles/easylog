/**
 * Formato do erro retornado pelo servidor
 */
export type FormExceptionError = { kind: string; error: string; constraints?: string[] };
