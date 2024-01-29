import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEventHandler } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { ButtonVariant } from 'react-bootstrap/esm/types';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

type SideBarProps = {
  title?: string;
  faicon?: IconProp;
  facolor?: string;
  variant?: ButtonVariant;
  onClick?: MouseEventHandler<HTMLElement>;
  link?: any;
};

export const SideBarAction: React.FC<SideBarProps> = (props) => {
  return (
    <Row className="action">
      <Col xs={1} />
      <Col className='d-grid gap-1'>
        {props.onClick && (
          <Button variant={props.variant} size="sm" onClick={props.onClick} >
            {props.faicon && <FontAwesomeIcon color={props.facolor} size="xs" icon={props.faicon} />} {props.title}
          </Button>
        )}
        {props.link && <Link to={props.link}>{props.title}</Link>}
      </Col>
    </Row>
  );
};
