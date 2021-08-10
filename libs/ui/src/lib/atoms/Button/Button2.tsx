import styled from 'styled-components';
import React from 'react';
import { Button } from 'react-bootstrap';

const StyledButton = styled(Button)`
  border-radius: 12px;
  margin-bottom: 5px;
  margin-top: 5px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  cursor: pointer;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  :hover {
    background-color: hsla(10, 100%, 25%, 0.1);
    transition: 5s;
  }
`;

export const Button2 = ({children, ...props}) => {
  return <StyledButton  {...props}>{children}</StyledButton>;
};
