import styled from 'styled-components';
import React from 'react';
import { Button } from 'react-bootstrap';

const StyledButton = styled(Button)`
  position: 'absolute',
    left: '95%',
    top: '-9%',
    backgroundColor: 'lightgray',
    color: 'gray',
`;

export const CloseButton = ({children, ...props}) => {
  return <StyledButton  {...props}>{children}</StyledButton>;
};
