import React, { useEffect } from 'react';
import styled from 'styled-components';
import {FcApproval, FcDisclaimer} from 'react-icons/all';
import { useDispatch } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { useAuthentication } from '@internship/shared/hooks';

const StyledApp = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
`;

const StyledH1 = styled.h2`
  text-align: center;
  font-weight: bold;
  margin: 0;
`;

const StyledFormContainer = styled.div`
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  width: auto;
  text-align: center;
`;

const StyledRegisterCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 384px;
  max-width: 100%;
  min-height: 480px;
`;

const StyledLabelLink = styled(Link)`
  display: inline-flex;
  justify-content: center;
  margin-top: 5px;
  color: black;
  font-size: 12px;
  padding: 7px 13px;
  border-radius: 3px;
  text-transform: uppercase;
  text-decoration: none;
  :hover {
    background-color: hsla(10, 100%, 25%, 0.1);
    transition: 5s;
  }
`;

export const MailErrorPage = (props) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();
  const history = useHistory();


  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);
  return (
    <StyledApp>
      <StyledRegisterCard>
        <StyledFormContainer>
          <FcDisclaimer size="100px" />
          <StyledH1>
            Hesabınız Doğrulanırken Bir Hata Oluştu Tekrar Deneyiniz.
          </StyledH1>
        </StyledFormContainer>
      </StyledRegisterCard>
    </StyledApp>
  );
};
