import { observer } from 'mobx-react-lite';
import moment from 'moment';
import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';
import NotificationValue, { NotificationProps, NotificationProvider, useNotificationStore } from './ctrl';

/**
 * Controlador das notificações
 */

// TODO: Ajustar após migrar classes para React.FC
export const notify = NotificationValue;

export default class NotificationMenu extends React.Component {
  render() {
    return (
      <NotificationProvider value={NotificationValue}>
        <NotificationList />
      </NotificationProvider>
    );
  }
}

/***
 * Barra do topo com as funções da listagem
 */
const NotificationList: React.FC = observer(() => {
  const notify = useNotificationStore();
  return (
    //TODO: Criar css para as notificações
    <div aria-live="polite" aria-atomic="true" style={{ position: 'relative', zIndex: 1100 }}>
      <div style={{ position: 'fixed', top: 45, right: 10 }}>
        {notify!.alerts.map((alert) => (
          <Notification key={alert.id} {...alert} />
        ))}
      </div>
    </div>
  );
});

const Notification: React.FC<NotificationProps> = ({ title, message, createdAt, className, detail }) => {
  const [show, setShow] = useState(true);
  return (
    <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide>
      <Toast.Header className={className}>
        <strong className="mr-auto">{title}</strong>
        &nbsp;&nbsp;
        <small>{moment(createdAt).format('L LT')}</small>
      </Toast.Header>
      <Toast.Body style={{ whiteSpace: 'pre-wrap' }}>
        <strong>{message}</strong>
      </Toast.Body>
      {!!detail && <Toast.Body>Detail: {detail}</Toast.Body>}
    </Toast>
  );
};
