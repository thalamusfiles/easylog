import numeral from 'numeral';
import Form from 'react-bootstrap/Form';
import { IamFormProps } from './index';

export function IamIntegerFormControl(props: IamFormProps) {
  return (
    <Form.Control
      autoComplete="off"
      type="text"
      name={props.name}
      disabled={props.disabled}
      value={props.description || props.value}
      isInvalid={props.invalidFeed}
      onChange={(event) => {
        if (props.onChange) {
          const parser = numeral(event.target.value);
          props.onChange(parser.value(), parser.format(), event);
        }
      }}
    />
  );
}

export function IamDecimalFormControl(props: IamFormProps) {
  return (
    <Form.Control
      autoComplete="off"
      type="text"
      name={props.name}
      disabled={props.disabled}
      value={props.description || props.value || ''}
      isInvalid={props.invalidFeed}
      onChange={(event) => {
        if (props.onChange) {
          const parser = numeral(event.target.value);
          props.onChange(parser.value(), parser.format(), event);
        }
      }}
    />
  );
}
