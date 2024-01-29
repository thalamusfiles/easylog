import React from 'react';
import { InputGroup } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { AttributeType, PickerType } from '../../commons/attribute-type';
import { findIamFormPlugin } from '../../commons/plugin.component';
import '../../plugins';
import { IamBooleanFormControl } from './iam-boolean-formcontrol';
import { IamChoiceFormControl } from './iam-choice-formcontrol';
import { IamDateFormControl } from './iam-date-formcontrol';
import { IamDateTimeFormControl } from './iam-datetime-formcontrol';
import { IamDecimalFormControl, IamIntegerFormControl } from './iam-number-formcontrol';
import { IamTextFormControl } from './iam-text-formcontrol';
import { IamTimeFormControl } from './iam-time-formcontrol';

/**
 * Definição das opções de um campo selecionavel
 */

export type IamOptionValue = {
  value: any;
  columns: string[];
};
export type IamFormEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | React.SyntheticEvent<any>;
/**
 * Definição da função chamada ao alterar um formulario
 *
 */
declare type IamFormEventHandler = (value: any | null, description: string[] | string | null, event: IamFormEvent) => void;

/**
 * Propriedades do formulário
 */
export declare type IamFormProps = {
  type: AttributeType | PickerType;
  name: string;
  title?: string;
  placeholder?: string;
  value?: any | [any] | null;
  description?: string;
  disabled?: boolean;
  // Informativos
  invalidFeed?: any;
  appendFeed?: string;

  filters?: any;
  //propriedade do formGroup
  groupAs?: any;
  column?: any;
  //propriedades do campo text
  multiline?: number;
  //propriedades do campo boolean
  checked?: boolean;
  //propriedades do campo selecionável
  multi?: boolean;
  header?: string[];
  options?: IamOptionValue[];
  //control
  controlClassName?: string;

  onChange?: IamFormEventHandler;
};

export declare type FormGroupProps = {
  append: any;
} & IamFormProps;

export function IamFormGroup(props: IamFormProps) {
  let Control, Column;
  switch (props.type) {
    case AttributeType.Text:
      Control = IamTextFormControl(props);
      break;
    case AttributeType.Integer:
      Control = IamIntegerFormControl(props);
      break;
    case AttributeType.Decimal:
      Control = IamDecimalFormControl(props);
      break;
    case AttributeType.Boolean:
      Control = IamBooleanFormControl(props);
      break;
    case AttributeType.MultiChoice:
      props.multi = true;
      Control = IamChoiceFormControl(props);
      break;
    case AttributeType.Choice:
      Control = IamChoiceFormControl(props);
      break;
    case AttributeType.Time:
      Control = IamTimeFormControl(props);
      break;
    case AttributeType.DateTime:
      Control = IamDateTimeFormControl(props);
      break;
    case AttributeType.Date:
      Control = IamDateFormControl(props);
      break;
    default:
      Control = findIamFormPlugin(props.type as PickerType, props);
  }
  Column = props.column ? <Col>{Control}</Col> : Control;
  return (
    <Form.Group as={props.groupAs}>
      {props.title && (
        <Form.Label column={props.column} sm={props.column ? 2 : undefined}>
          {props.title}
        </Form.Label>
      )}
      {Column}
      <Form.Control.Feedback type="invalid">{props.invalidFeed}</Form.Control.Feedback>
      {props.appendFeed && <Form.Text muted>{props.appendFeed}</Form.Text>}
    </Form.Group>
  );
}

export function IamInputGroup(props: FormGroupProps) {
  let Control, Column;
  switch (props.type) {
    case AttributeType.Text:
      Control = IamTextFormControl(props);
      break;
    case AttributeType.Integer:
      Control = IamIntegerFormControl(props);
      break;
    case AttributeType.Decimal:
      Control = IamDecimalFormControl(props);
      break;
    case AttributeType.Boolean:
      Control = IamBooleanFormControl(props);
      break;
    case AttributeType.MultiChoice:
      props.multi = true;
      Control = IamChoiceFormControl(props);
      break;
    case AttributeType.Choice:
      Control = IamChoiceFormControl(props);
      break;
    case AttributeType.Time:
      Control = IamTimeFormControl(props);
      break;
    case AttributeType.DateTime:
      Control = IamDateTimeFormControl(props);
      break;
    case AttributeType.Date:
      Control = IamDateFormControl(props);
      break;
    default:
      Control = findIamFormPlugin(props.type as PickerType, props);
  }
  Column = props.column ? <Col>{Control}</Col> : Control;
  return (
    <InputGroup as={props.groupAs}>
      {props.title && (
        <Form.Label column={props.column} sm={props.column ? 2 : undefined}>
          {props.title}
        </Form.Label>
      )}
      {Column}
      <Form.Control.Feedback type="invalid">{props.invalidFeed}</Form.Control.Feedback>
      {props.appendFeed && <Form.Text muted>{props.appendFeed}</Form.Text>}
      {props.append}
    </InputGroup>
  );
}
