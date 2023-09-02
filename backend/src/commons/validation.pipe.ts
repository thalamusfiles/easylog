import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { FormException, FormExceptionError } from './form.exception';

const unnextError = (errors: ValidationError[], parentProperty = ''): ValidationError[] => {
  return errors.reduce((prev: ValidationError[], cur: ValidationError) => {
    cur.property = parentProperty + cur.property;
    prev.push(cur);

    return prev.concat(unnextError(cur.children, `${cur.property}.`));
  }, []);
};

const formatValidationExpectionFactory = (errors: ValidationError[]) => {
  const errosFormated: Array<FormExceptionError> = unnextError(errors).map((e) => ({
    kind: e.property,
    error: Object.values(e.constraints || []).join('. '),
    constraints: Object.keys(e.constraints || []),
  }));
  return new FormException(errosFormated); //
};

export class RegisterValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      transform: true,
      exceptionFactory: formatValidationExpectionFactory,
      ...options,
    });
  }
}
