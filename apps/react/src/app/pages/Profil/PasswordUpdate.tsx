import React, { useState } from 'react';
import {  Input, PopupButton } from '@internship/ui';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { api } from '@internship/shared/api';
import { logout } from '@internship/store/authentication';
import { useTemporary } from '@internship/shared/hooks';

type PasswordUpdateProps = {
  showProfileEdit;
  handleCloseProfileEdit;
  handleShowProfileEdit;
};
const StyledForm = styled(Form)`
  background-color: #ffffff;
  margin-top:30px;
  margin-bottom:30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  width: auto;
  text-align: center;
`;
const StyledInput = styled(Input)`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  width: 100%;
`;
const StyledErrorLabel = styled.label`
  color: #bf1650;
  font-size: 14px;
`;

const StyledSuccessLabel = styled.label`
  color: green;
  font-size: 14px;
`;

export const PasswordUpdate: React.FC<PasswordUpdateProps> = ({ showProfileEdit,handleCloseProfileEdit,handleShowProfileEdit }) => {
  const { handleSubmit, register, errors, getValues,reset } = useForm();
  const [passworderror, setPasswordError] = useState('');
  const [enable, setEnable] = useState(false);
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const dispatch = useDispatch();
  const onSubmitPassword=async (values)=>{
    /*await dispatch(passwordupdateAsync.request(values));*/
    if(isSuccessRequired){handleCloseProfileEdit();}
  };

  const onChangePasswordControl = () => {
    const firstPassword = getValues()['NewPassword'];
    const secondPassword = getValues()['NewPasswordConfirm'];
    if (firstPassword !== secondPassword) {
      setPasswordError('Şifre Eşleşmedi');
      setEnable(true);
    } else {
      setPasswordError('');
      setEnable(false);
    }
  };

  return(
    <StyledForm onSubmit={handleSubmit(onSubmitPassword)}>
      <StyledInput
        type="password"
        onChange={onChangePasswordControl}
        placeholder="Eski Şifre(*)"
        name="OldPassword"
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
            value: /^[a-zA-Z0-9]+$/,
            message:
              'Your password can contain the characters A-Z, a-z, and 0-9.',
          },
          validate: (input) =>
            /^(?=.{6,20}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/.test(
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
        placeholder="Yeni Şifre(*)"
        name="NewPassword"
        errors={errors}
      />
      <StyledInput
        type="password"
        onChange={onChangePasswordControl}
        placeholder="Yeni Şifre Doğrulama(*)"
        name="NewPasswordConfirm"
        errors={errors}
      />
      {enable ? (
        <StyledErrorLabel>{passworderror}</StyledErrorLabel>
      ) : null}
      {isSuccessRequired?(<StyledSuccessLabel>{isSuccessRequired}</StyledSuccessLabel>):(null)}
      {isErrorRequired?(<StyledErrorLabel>{isErrorRequired}</StyledErrorLabel>):(null)}
      <button type="submit" className="btn btn-warning mt-3 ">Güncelle</button>
    </StyledForm>
  );
}
