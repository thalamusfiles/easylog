import { action, makeObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';

export type NotificationProps = {
  id: string;
  className?: string;
  title: string;
  message: string;
  detail?: string;
  createdAt: Date;
};

export class NotificationCtx {
  @observable alerts: NotificationProps[] = [];
  @observable amount: number = 0;

  constructor() {
    //Modifica classe pra ser observável
    makeObservable(this);
  }

  @action
  showAll() {
    this.amount = 0;
    this.alerts.forEach((a) => {
      a.id = Math.random().toString(32);
    });
  }

  @action
  success = (message: string, title?: string) => {
    this.amount++;
    this.alerts.unshift({
      id: Math.random().toString(32),
      className: 'bg-success text-white',
      title: title || 'Success',
      message: message,
      createdAt: new Date(),
    });
  };

  @action
  warn = (message: string, title?: string, detail?: string) => {
    this.amount++;
    this.alerts.unshift({
      id: Math.random().toString(32),
      className: 'bg-warning',
      title: title || 'Warning',
      message: message,
      detail: detail,
      createdAt: new Date(),
    });
  };

  @action
  danger = (message: string, title?: string) => {
    this.amount++;
    this.alerts.unshift({
      id: Math.random().toString(32),
      className: 'bg-danger text-white',
      title: title || 'Error',
      message: message,
      createdAt: new Date(),
    });
  };

  @action
  info = (message: string, title?: string) => {
    this.amount++;
    this.alerts.unshift({
      id: Math.random().toString(32),
      className: 'bg-info text-white',
      title: title || 'Info',
      message: message,
      createdAt: new Date(),
    });
  };
}

const NotificationValue = new NotificationCtx();
export default NotificationValue;

export const NotificationContext = createContext<NotificationCtx>({} as NotificationCtx);
export const NotificationProvider = NotificationContext.Provider;
export const useNotificationStore = (): NotificationCtx => useContext(NotificationContext);
