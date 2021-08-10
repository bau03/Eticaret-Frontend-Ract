import React from 'react';
import { Button as RBButton } from 'react-bootstrap';

export const Button = ({children, ...props}) => {
  return <RBButton variant="primary" {...props}>{children}</RBButton>;
};
