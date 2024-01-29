import { ErrorListRecord } from './types/ErrorListRecord';
import { ErrorRecord } from './types/ErrorRecord';
import { FormExceptionError } from './types/FormExceptionError';

type GetFormExceptionErrosOptions = {
  splitByConstraints?: boolean;
  ignoreKindsToMessage?: string[];
};

export type Erros = [string[], ErrorRecord];
export type ErrosAsList = [string[], ErrorListRecord];
type ErrosObject = Erros | ErrosAsList;

/**
 * Transforma a exceção FormException vinda do servidor em um objecto com os erros
 * @param responseData: Axios responsa data
 * @param ignoreKindsToMessage: Lista de itens que será ignora na mensagem principal
 */
export const getFormExceptionErrosToObject = (
  responseData: any,
  { splitByConstraints, ignoreKindsToMessage }: GetFormExceptionErrosOptions = {},
): ErrosObject => {
  const messages: Array<string> = [];
  const erros: ErrorRecord | ErrorListRecord = {};

  if (responseData) {
    if (responseData.errors?.length) {
      // Erros retornardos via resposta da api.
      const respErros: FormExceptionError[] = responseData.errors;

      // Percorre os erros e monta o objeto de retorno;
      for (let { kind, error, constraints } of respErros) {
        if (splitByConstraints) {
          const constraintErros: string[] = constraints?.map((value) => `${kind}.${value}`) || [error];
          // Só adiciona se tiver constraint
          if (constraintErros) {
            erros[kind] = constraintErros;

            if (!ignoreKindsToMessage?.includes(kind) && error) {
              constraintErros.forEach((value) => messages.push(value));
            }
          }
        } else {
          if (kind) {
            erros[kind] = error;
          }
          if (!ignoreKindsToMessage?.includes(kind) && error) {
            messages.push(error);
          }
        }
      }
    } else if (responseData.message) {
      messages.push(responseData.message);
    }
  }
  return [messages, erros as ErrorRecord & ErrorListRecord];
};
