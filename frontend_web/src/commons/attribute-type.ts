export enum AttributeType {
  Text,
  Integer,
  Decimal,
  Boolean,
  Choice,
  MultiChoice,
  Date,
  DateTime,
  Time,
  Json,
}

export const PickersNames = {
  user: 'user_picker',
  application: 'application_picker',
};

export type PickerType = 'user_picker' | string;
