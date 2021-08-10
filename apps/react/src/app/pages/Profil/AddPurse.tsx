import React, {useEffect} from 'react';
import {Input, PopupButton} from '@internship/ui';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTemporary } from '@internship/shared/hooks';
import {purseAddAsync} from "@internship/store/authentication";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
type AddAdressProps = {
  showProfileEdit;
  handleCloseProfileEdit;
  handleShowProfileEdit;
  setShow
};
const StyledInput = styled(Input)`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  width: 100%;
`;
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
const StyledSuccessLabel = styled.label`
  color: green;
  font-size: 14px;
`;

export const AddPurse: React.FC<AddAdressProps> = ({ showProfileEdit, handleCloseProfileEdit, handleShowProfileEdit,setShow}) => {
  const { handleSubmit, register, errors, getValues, reset } = useForm();
  const dispatch = useDispatch();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const notify = () => toast.success(isSuccessRequired);
  const notifyWarning = () => toast.warning(isErrorRequired);


  useEffect(() => {
    if(isSuccessRequired==='Successfully adress add.'){
      notify();
    }
    else{
      notifyWarning();
    }
  }, [isErrorRequired||isSuccessRequired]);
  const onSubmitAbout = async (values) => {
    await dispatch(purseAddAsync.request(values));
    await handleCloseProfileEdit();
    await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    setShow(true);
  };
  return (
    <StyledForm  className="my-sm-0" onSubmit={handleSubmit(onSubmitAbout)}>
      <p>Yüklenecek Tutarı Giriniz.</p>
      <StyledInput
        type="number"
        step="0.5"
        placeholder="Tutar(*)"
        name="balance"
        ref={register({ required: true })}
        errors={errors}
      />

      {isSuccessRequired ? (<StyledSuccessLabel>{isSuccessRequired}</StyledSuccessLabel>) : (null)}
      <button type="submit" className="btn btn-success mt-3 ">Ekle</button>
    </StyledForm>
  );
};
