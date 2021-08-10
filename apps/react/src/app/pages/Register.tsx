import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Form, FormControl } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FcApproval, FcDisclaimer } from 'react-icons/all';
import { ClipLoader } from 'react-spinners';
import { Input } from '@internship/ui';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { registerAsync } from '@internship/store/authentication';
const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  height: 100vh;
  margin: -20px 0 50px;
  margin-top:15px;
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
`;
const StyledRegisterCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 384px;
  max-width: 100%;
  min-height: 600px;
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
const StyledButton = styled.button`
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
  width: 100%;
`;
const StyledFormControl = styled(FormControl)`
  background-color: #eee;
  border: none;
  margin: 8px 0;
`;
const StyledErrorLabel = styled.label`
  color: #bf1650;
  font-size: 14px;
`;
const StyledP=styled.p`
color:green;
margin-bottom: -35px;
`;
const StyledErrorP=styled.p`
color:red;
margin-bottom: -35px;
`;

export const Register = () => {
  const { handleSubmit, register, errors, getValues,reset } = useForm();
  const dispatch = useDispatch();
  const [passworderror, setPasswordError] = useState('');
  const [enable, setEnable] = useState(false);
  const { isAuthenticated } = useAuthentication();
  const history = useHistory();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const strongRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  const onSubmit = async (values) => {
    await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    await setPedingApiCall(true);
    await dispatch(registerAsync.request(values));
    reset();
  };


  useEffect(() => {
    if(isSuccessRequired || isErrorRequired){
      setPedingApiCall(false);
    }
  }, [isSuccessRequired,isErrorRequired]);
  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const onChangePasswordControl = () => {
    const firstPassword = getValues()['password'];
    const secondPassword = getValues()['PasswordConfirm'];
    if (firstPassword !== secondPassword) {
      setPasswordError('Şifre Eşleşmedi');
      setEnable(true);
    } else {
      setPasswordError('');
      setEnable(false);
    }
  };

  return (
    <StyledApp>
      <StyledRegisterCard>
        <StyledFormContainer>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledH1>Kayıt Ol</StyledH1>
            <StyledHr />
            <StyledInput
              type="text"
              placeholder="Username(*)"
              name="username"
              ref={register({ required: true })}
              errors={errors}
            />
            <StyledInput
              type="email"
              placeholder="E-mail(*)"
              name="email"
              ref={register({ required: true })}
              errors={errors}
            />
            <StyledInput
              type="password"
              placeholder="Şifre(*)"
              onChange={onChangePasswordControl}
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
              name="PasswordConfirm"
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
            {enable ? (
              <StyledErrorLabel>{passworderror}</StyledErrorLabel>
            ) : null}
            {isErrorRequired ? (
              <StyledErrorP><FcDisclaimer size="20px" />{isErrorRequired}</StyledErrorP>

            ) : (null)}
            {isSuccessRequired?(<StyledP><FcApproval size="20px" />{isSuccessRequired}</StyledP>):(null)}
            {pedingApiCall?(<ClipLoader/>):(<StyledButton type="submit" disabled={enable}>
              Kayıt Ol
            </StyledButton>)}
            <StyledLabelLink to="/login">Bir Hesabım Var</StyledLabelLink>
          </StyledForm>
        </StyledFormContainer>
      </StyledRegisterCard>
    </StyledApp>
  );
};

export default Register;
