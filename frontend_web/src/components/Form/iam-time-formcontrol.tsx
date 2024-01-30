import enUS from 'date-fns/locale/en-US';
import ptBR from 'date-fns/locale/pt-BR';
import moment from 'moment';
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IamFormProps } from './index';

registerLocale('pt-BR', ptBR);
registerLocale('en-US', enUS);

export function IamTimeFormControl(props: IamFormProps) {
  let selected;
  if (typeof props.value === 'string') {
    selected = moment(props.value).toDate();
  } else {
    selected = props.value;
  }
  return (
    <DatePicker
      name={props.name}
      className="form-control"
      wrapperClassName="form-control"
      selected={selected}
      onChange={(date, event) => {
        if (props.onChange) {
          props.onChange(date, null, event as React.SyntheticEvent);
        }
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      locale={'pt_BR'}
      dateFormat="p"
    />
  );
}
