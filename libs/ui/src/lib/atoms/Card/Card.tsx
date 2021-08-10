import React from 'react';
import styled from 'styled-components';

const StyledCardContainer=styled.div`
  background-color: #FFF;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
   top: 0;
  transition: all 0.6s ease-in-out;
  margin-bottom:25px;
`;
export const Card = ({children, ...props}) => {
  return <StyledCardContainer {...props}>{children}</StyledCardContainer>;
};
