import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {CKEditor} from "ckeditor4-react";
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button2,InfoAlerts} from "@internship/ui";
import {sellerBeginAsync} from "@internship/store/authentication";

export const SellerBegin=()=>{
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const { handleSubmit, register } = useForm();
  const [showForm,setShowForm]=useState(false);
  const [data,setData]=useState(null);
  const history = useHistory();

  const notify = () => toast.success(isSuccessRequired);
  const notifyWarning = () => toast.warning(isErrorRequired);


  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    if (!isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  const onEditorChange = event => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    setData(event.editor.getData());
  };

  const onSubmit = async (values) => {
    values = {...values,content:data};
    await dispatch(sellerBeginAsync.request(values));
    await setShowForm(false);
  };

  useEffect(() => {
    if(isSuccessRequired==='Başvurunuz Oluşturuldu.'){
      notify();
    }
    else{
      notifyWarning();
    }
  }, [isErrorRequired||isSuccessRequired]);
  const onClick=()=>{
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    setShowForm(true);
  }
  return(
    <Container className='mt-3'>
      <InfoAlerts>
        Satıcı olmak için başvurunuzu tamamlayınız.
      </InfoAlerts>
     {/* <AppealDetailPage show={showForm}/>*/}
      {!showForm?(<button type="button" className="btn btn-outline-info mb-3 " onClick={onClick}>Yeni Başvuru Oluştur.</button>
      ):(null)}
      {showForm?(
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="rowEditor">
            <CKEditor
              data={"<h1>*Örnektir*</h1><h3><strong>İsim</strong> : Mehmet Batuhan</h3><p><strong>Soyİsim:</strong> YAL&Ccedil;IN</p> <p><strong>Eğitim : </strong>Gazi &Uuml;niversitesi Teknoloji Fak&uuml;ltesi Bilgisayar M&uuml;hendisliği 4. Sınıf &Ouml;ğrencisi</p>"}
              name='content'
              ref={register}
              onChange={onEditorChange}
              placeholder={'asdasd'}
            />
          </div>
          <div className="row justify-content-center align-items-center">
            <Button2 type="submit" >Başvuru</Button2>
          </div>
        </Form>):(null)}
      <ToastContainer position={'bottom-right'}/>
    </Container>
  );

}
