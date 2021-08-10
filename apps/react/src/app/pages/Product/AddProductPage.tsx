import React, { useEffect, useState } from 'react';
import {Container, FormControl} from 'react-bootstrap';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {CKEditor} from "ckeditor4-react";
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button2, InfoAlerts, Input} from "@internship/ui";
import {addProductAsync, sellerBeginAsync} from "@internship/store/authentication";
import styled from "styled-components";

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
const StyledFileInput=styled.input`
font-size:15px;
`;

export const AddProductPage=()=>{
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const { handleSubmit, register, errors, getValues,reset } = useForm();
  const [showForm,setShowForm]=useState(false);
  const [data,setData]=useState(null);
  const history = useHistory();
  const [newImage,setNewImage] =useState(undefined);
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
    values = {...values,explanation:data};
    values = {...values,productImage:newImage};
    await dispatch(addProductAsync.request(values));
    await setShowForm(false);
  };
  useEffect(() => {
    if(isSuccessRequired==='Ürün eklendi.'){
      notify();
      reset();
    }
    else{
      notifyWarning();
    }
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  }, [isErrorRequired||isSuccessRequired]);



  const onChangeFile=(event)=>{
    const file=event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload=()=>{
      setNewImage(fileReader.result)
    }
    fileReader.readAsDataURL(file);
  }

  return(
    <Container className='mt-3'>
      <InfoAlerts>
        Ürün bilgilerinizi eksiksiz girdikten sonra kaydetmeyi unutmayınız. Kaydedilen ürünler yetkililer tarafından incelenecek ve onaylanacaktır.
      </InfoAlerts>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <StyledInput
            type="text"
            placeholder="Ürün İsmi(*)"
            name="productName"
            ref={register({ required: true })}
            errors={errors}
          />
          <StyledFormControl
            className="form-control"
            as="select"
            name="productCategory"
            ref={register({ required: true })}
          >
            <option value={'0'}>Ürün Kategorisini Seciniz(*)</option>
            <option value="Elektronik">Elektronik</option>
            <option value="Kitap">Kitap</option>
            <option value="Ofis">Ofis</option>
            <option value="Genel">Genel</option>
          </StyledFormControl>
          <label className={"text-black-50"}>Ürün Resmi Seçimi </label><hr className={"my-sm-0 m-md-n2 w-25"}/><br/>
          <StyledFileInput
            className={"mb-2"} type="file" onChange={onChangeFile}/>
          {newImage?(<div>
            <label className={"text-black-50"}>Resm ön izleme </label><br/>
            <img className={"card m-auto"}src={newImage} height={"200px"} width={"200px"}/>
          </div>):(null)}

          <StyledInput
            type="number"
            step="0.5"
            placeholder="Ürün Fiyatı(*)"
            name="price"
            ref={register({ required: true })}
            errors={errors}
          />
          <StyledInput
            type="number"
            step="1"
            placeholder="Ürün Stok Sayısı(*)"
            name="stock"
            ref={register({ required: true })}
            errors={errors}
          />
          <div className="rowEditor">
            <CKEditor
              data={"<h1>Ürün Açıklaması</h1>"}
              name='explanation'
              ref={register}
              onChange={onEditorChange}
              placeholder={'asdasd'}
            />
          </div>
          <div className="row justify-content-center align-items-center">
            <Button2 type="submit" >Ürünü Ekle</Button2>
          </div>
        </Form>
      <ToastContainer position={'bottom-right'}/>
    </Container>
  );

}
