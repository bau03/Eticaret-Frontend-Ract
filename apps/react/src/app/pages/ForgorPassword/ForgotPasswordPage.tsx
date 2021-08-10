import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { FcApproval, FcDisclaimer } from 'react-icons/all';
import { ClipLoader } from 'react-spinners';
import { useTemporary } from '@internship/shared/hooks';
import { forgotpasswordAsync } from '@internship/store/authentication';
import { Input } from '@internship/ui';

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

const StyledButton = styled.button`
  border-radius: 20px;
  margin-top: 20px;
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


const StyledInput = styled(Input)`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

const StyledP=styled.p`
color:green;
`;

const StyledErrorP=styled.p`
color:red;
`;

export const ForgotPasswordPage = () => {
  const { handleSubmit, register,errors } = useForm();
  const dispatch = useDispatch();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const [pedingApiCall,setPedingApiCall]=useState(false);

  const onSubmit = async (values) => {
    await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    await setPedingApiCall(true);
    await dispatch(forgotpasswordAsync.request(values));
  };
  useEffect(() => {
    if(isSuccessRequired || isErrorRequired){
      setPedingApiCall(false);
    }
  }, [isSuccessRequired,isErrorRequired]);

  return (
    <StyledApp>
      <StyledRegisterCard>
        <StyledFormContainer>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <StyledH1>Hesabınıza Ait E-Mail Adresinizi Giriniz</StyledH1>
            <StyledHr />
            <StyledInput type="email" placeholder="E-mail (*)" name="email" ref={register({ required: true })} errors={errors}/>
            {isSuccessRequired?(<StyledP><FcApproval size="20px" />{isSuccessRequired}</StyledP>):(null)}
            {isErrorRequired ? (
              <StyledErrorP><FcDisclaimer size="20px" />{isErrorRequired}</StyledErrorP>
            ) : (null)}
            {pedingApiCall?(<ClipLoader/>):(<StyledButton type="submit">Şifremi Sıfırla</StyledButton>)}
          </StyledForm>
        </StyledFormContainer>
      </StyledRegisterCard>
    </StyledApp>
  );
};
