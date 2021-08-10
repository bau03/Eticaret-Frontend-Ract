import React from 'react';
import { PopupButton } from '@internship/ui';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTemporary } from '@internship/shared/hooks';

type AboutUpdateProps = {
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
const StyledSuccessLabel = styled.label`
  color: green;
  font-size: 14px;
`;

export const AboutUpdate: React.FC<AboutUpdateProps> = ({ showProfileEdit, handleCloseProfileEdit, handleShowProfileEdit }) => {
  const { handleSubmit, register, errors, getValues, reset } = useForm();
  const dispatch = useDispatch();
  const { isErrorRequired, isSuccessRequired } = useTemporary();

  const onSubmitAbout = async (values) => {
   /* await dispatch(profileAboutUpdateAsync.request(values));*/
    await handleCloseProfileEdit();
    await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });

  };
  return (
    <StyledForm onSubmit={handleSubmit(onSubmitAbout)}>
      <Form.Control
        as="textarea"
        name="About"
        rows={3}
        placeholder="Profilinizi görüntüleyen kullanıcılar için hakkınızda kısa bir özet paylaşabilirsiniz."
        ref={register({
          required: true,
          maxLength: {
            value: 150,
            message: 'Password cannot exceed 20 characters'
          }
        })}
      />
      {isSuccessRequired ? (<StyledSuccessLabel>{isSuccessRequired}</StyledSuccessLabel>) : (null)}
      <button type="submit" className="btn btn-warning mt-3 ">Güncelle</button>
    </StyledForm>
  );
};
