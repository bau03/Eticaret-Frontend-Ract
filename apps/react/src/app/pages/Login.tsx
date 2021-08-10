import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '@internship/store/authentication';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { Captcha } from '@internship/ui';
import { Form, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Input } from '@internship/ui';

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;
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
  &:after {
    content: '';
    width: 475px;
    height: 1px;
    background: #dee3ed;
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: 20px;
  }
`;
const StyledFormContainer = styled.div`
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
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
const StyledForm = styled(Form)`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  width: auto;
  text-align: center;
`;
const StyledHr = styled.hr`
  display: block;
  border: none;
  height: 3px;
  background-color: salmon;
  z-index: 3;
  margin: 0px;
  -webkit-animation-name: line-show; /* Safari 4.0 - 8.0 */
  -webkit-animation-duration: 0.3s; /* Safari 4.0 - 8.0 */
  animation-name: line-show;
  animation-duration: 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1);
  -o-transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1);
  transition-timing-function: cubic-bezier(0.795, 0, 0.165, 1); /* custom */
`;
const StyledButton = styled(Button)`
  border-radius: 20px;
  margin-top: 40px;
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
const StyledInput = styled(Input)`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;
const StyledP=styled.p`
color:red;
`;

export const Login = (context) => {
  const { handleSubmit, register, errors } = useForm();
  const { isCaptchaRequired } = useTemporary();
  const { isAuthenticated } = useAuthentication();
  const {isSuccessRequired} = useTemporary();
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const isErrorRequired = useSelector((store) => store.temp?.errorRequired);
  const dispatch = useDispatch();
  const history = useHistory();

  const onChange = () => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };
  const onSubmit = async (values) => {
    await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    await setPedingApiCall(true);
    await  dispatch(loginAsync.request(values));
  };
  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);
  return (
    <StyledApp>
    <StyledRegisterCard>
      <StyledFormContainer>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledH1>Giriş</StyledH1>
          <StyledHr />
          <StyledInput
            type="text"
            onChange={onChange}
            placeholder="Username"
            name="username"
            ref={register({ required: true })}
            errors={errors}
          />
          <StyledInput
            type="password"
            onChange={onChange}
            placeholder="Şifre"
            name="password"
            ref={register({
              required: true,
              maxLength: {
                value: 20,
                message: 'Password cannot exceed 20 characters',
              },
              minLength: {
                value: 6,
                message: 'Password cannot be less than 6 characters',
              }
            })}
            errors={errors}
          />
          {isCaptchaRequired ? (
            <StyledRow>
              <div className="col-8">
                <Captcha name="captcha" ref={register({ required: true })} />
              </div>
            </StyledRow>
          ) : null}
          {isErrorRequired?(<StyledP>{isErrorRequired}</StyledP>):(null)}
          {pedingApiCall?(<ClipLoader/>):(<StyledButton type="submit">Giriş</StyledButton>)}
          <StyledLabelLink to="/forgotpassword">
            Şifremi Unuttum
          </StyledLabelLink>
          <StyledLabelLink to="/register">
            Henüz bir hesabınız yok mu?
          </StyledLabelLink>
        </StyledForm>
      </StyledFormContainer>
    </StyledRegisterCard>
  </StyledApp>
  );
};
