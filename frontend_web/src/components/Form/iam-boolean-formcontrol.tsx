import Form from 'react-bootstrap/Form';
import { IamFormProps } from './index';

export function IamBooleanFormControl(props: IamFormProps) {
  return (
    <Form.Check
      autoComplete="off"
      type="switch"
      id={props.name}
      name={props.name}
      label={props.placeholder}
      value={props.value || ''}
      checked={props.checked}
      isInvalid={props.invalidFeed}
      onChange={(event) => props.onChange && props.onChange(event.target.checked, event.target.value, event)}
    />
  );
}
