import moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IamFormProps } from './index';

export function IamDateTimeFormControl(props: IamFormProps) {
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
      showTimeSelect
      dateFormat="Pp"
      locale={'pt_BR'}
      onChange={(date, event) => {
        if (props.onChange) props.onChange(date, null, event as React.SyntheticEvent);
      }}
    />
  );
}
