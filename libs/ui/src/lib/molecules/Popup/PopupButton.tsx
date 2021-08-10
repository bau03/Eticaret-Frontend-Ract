import React from 'react';
import { Button } from 'react-bootstrap';

export const PopupButton = ({ children, ...props }) => {
  const { variant, onClick } = props;

  return (
    <Button className="m-md-2" variant={variant} onClick={onClick} {...props}>
      {children}
    </Button>
  );
};
