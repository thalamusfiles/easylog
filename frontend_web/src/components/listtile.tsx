import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type ListTileProps = {
  title: string;
  variant?: string;
  faicon?: any;
  onClick?: any;
};

function ListTile({ faicon, variant, title, ...rest }: ListTileProps) {
  const isArray = Array.isArray(faicon);

  if (!variant)
    //Todo: Remover bloco após definis cores dos componentes
    switch (parseInt((Math.random() * 6).toString())) {
      case 5:
        variant = 'secondary';
        break;
      case 4:
        variant = 'danger';
        break;
      case 3:
        variant = 'warning';
        break;
      case 2:
        variant = 'success';
        break;
      case 1:
        variant = 'info';
        break;
      default:
        variant = 'primary';
        break;
    }

  return (
    <Row className="list-tile" {...rest}>
      <Col xs={2}>
        {faicon && (
          <Button variant={variant}>
            {isArray &&
              faicon.map((faicon: IconProp, idx: any) => <FontAwesomeIcon key={idx} size="sm" icon={faicon} pull={idx ? 'right' : 'left'} />)}
            {!isArray && <FontAwesomeIcon icon={faicon} />}
          </Button>
        )}
      </Col>
      <Col>{title}</Col>
    </Row>
  );
}

export default ListTile;
