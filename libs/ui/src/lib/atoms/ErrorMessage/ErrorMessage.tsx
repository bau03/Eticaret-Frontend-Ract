import React from 'react';
import styled from 'styled-components';

type ErrorMessageProps = {
  name: string;
  errors: Record<string, any>;

};

const StyledP = styled.p`
  color: #bf1650;
  font-size: 14px;
  margin-top:3px;
  margin-bottom:3px;
`;

const getDefaultMessage = (errors, name) => {
  switch (errors[name]?.['type']) {
    case 'required':
      return 'Bu alan gereklidir.';
  }
};

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
  const {  errors, name } = props;

  return <StyledP>{errors[name]?.['message'] || getDefaultMessage(errors, name)}</StyledP>;
};
