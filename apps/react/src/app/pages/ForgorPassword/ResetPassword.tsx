import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import {Form} from 'react-bootstrap';
import { resetpasswordAsync } from '@internship/store/authentication';
import { getUrlParameter } from '@internship/shared/utils';
import { useTemporary } from '@internship/shared/hooks';
import {Button,Input} from '@internship/ui';
import {ClipLoader} from "react-spinners";
import { Link, useHistory,Redirect} from 'react-router-dom';
import {FcApproval} from "react-icons/all";

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
const StyledErrorLabel = styled.label`
  color: #bf1650;
  font-size: 14px;
`;
const StyledP=styled.p`
color:red;
`;
const StyledS=styled.p`
color:green;
`;

export const ResetPassword = (props) => {
  const resttoken = getUrlParameter('token', props.location.search);
  const error = getUrlParameter('error', props.location.search);
  const { handleSubmit, register, getValues, errors } = useForm();
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const strongRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  const dispatch = useDispatch();
  const history = useHistory();
  const [passworderror, setPasswordError] = useState('');
  const [enable, setEnable] = useState(false);
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const onSubmit = (values) => {
    values = { ...values, token: resttoken };
    dispatch(resetpasswordAsync.request(values));
    if (isErrorRequired) history.push('/login');
    else {
      setEnable(false);
    }
  };

  const onChangePasswordControl = () => {
    const firstPassword = getValues()['newPassword'];
    const secondPassword = getValues()['newPasswordConfirmation'];
    if (firstPassword !== secondPassword) {
      setPasswordError('Şifre Eşleşmedi');
      setEnable(true);
    } else {
      setPasswordError('');
      setEnable(false);
    }
  };

  if (resttoken) {
    return (
        <StyledApp>
          <StyledRegisterCard>
            <StyledFormContainer>
              <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledH1>Şifre Sıfırlama</StyledH1>
                <StyledHr />
                <StyledInput
                  type="password"
                  placeholder="Şifre(*)"
                  onChange={onChangePasswordControl}
                  name="newPassword"
                  ref={register({
                    required: true,
                    maxLength: {
                      value: 20,
                      message: 'Password cannot exceed 20 characters',
                    },
                    minLength: {
                      value: 6,
                      message: 'Password cannot be less than 6 characters',
                    },
                    pattern: {
                      value: strongRegex,
                      message:
                        'Your password can contain the characters A-Z, a-z, and 0-9.',
                    },
                    validate: (input) =>
                      strongRegex.test(
                        input
                      )
                        ? null
                        : 'Your password must contain numbers, uppercase and lowercase letters.',
                  })}
                  errors={errors}
                />
                <StyledInput
                  type="password"
                  onChange={onChangePasswordControl}
                  placeholder="Şifre Doğrulama(*)"
                  name="newPasswordConfirmation"
                  ref={register({
                    required: true,
                    maxLength: {
                      value: 20,
                      message: 'Password cannot exceed 20 characters',
                    },
                    minLength: {
                      value: 6,
                      message: 'Password cannot be less than 6 characters',
                    },
                    pattern: {
                      value: strongRegex,
                      message:
                        'Your password can contain the characters A-Z, a-z, and 0-9.',
                    },
                    validate: (input) =>
                      strongRegex.test(
                        input
                      )
                        ? null
                        : 'Your password must contain numbers, uppercase and lowercase letters.',
                  })}
                  errors={errors}
                />
                <StyledErrorLabel>{passworderror}</StyledErrorLabel>
                {isErrorRequired?(<StyledP>{isErrorRequired}</StyledP>):(null)}
                {isSuccessRequired?(<StyledS><FcApproval size="20px" />{isSuccessRequired}</StyledS>):(null)}
                {pedingApiCall?(<ClipLoader/>):(<StyledButton type="submit">Güncelle</StyledButton>)}
                <StyledLabelLink to="/login">
                  Giriş
                </StyledLabelLink>
                <StyledLabelLink to="/register">
                  Henüz bir hesabınız yok mu?
                </StyledLabelLink>
              </StyledForm>
            </StyledFormContainer>
          </StyledRegisterCard>
        </StyledApp>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: {
            from: props.location,
            error: error,
          },
        }}
      />
    );
  }
};
