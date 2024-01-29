import React, { PropsWithChildren } from 'react';
import Col from 'react-bootstrap/Col';

type SideBarProps = PropsWithChildren<{
  colSize: number;
}>;

export const SideBar: React.FC<SideBarProps> = ({ colSize, children }) => {
  return (
    <Col md={colSize} className="sidebar">
      {children}
    </Col>
  );
};
