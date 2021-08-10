import React, {useEffect, useState} from 'react';
import {Input, Popup} from '@internship/ui';
import {Accordion, Button, Card, Container, Form} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import {showcaseAsync} from "@internship/store/authentication";
import {toast, ToastContainer} from "react-toastify";

type ContentMoreProps = {
  showcase;
  handleCloseShowcase;
  handleShowcase;
  setShowcase;
  productName;
  productId;
};
const StyledInput = styled(Input)`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  width: 100%;
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

export const Showcase: React.FC<ContentMoreProps> = ({ showcase,handleCloseShowcase,handleShowcase,setShowcase,productName,productId}) => {
  const { handleSubmit, register, errors, getValues,reset } = useForm();
  const [btnEnable,setbtnEnable]=useState(undefined);
  const [price,setPrice]=useState("");
  const [endTime,setEndTime]=useState(new Date());
  const dispatch = useDispatch();
  const [info,setInfo]=useState(undefined);
  const notify = () => toast.success(info);
  const onSubmit = async (values) => {
    values = {...values,productId:productId};
    values = {...values,price:price};
    values = {...values,endTime:endTime};
    await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    await dispatch(showcaseAsync.request(values));
    reset();
    handleCloseShowcase();
  };

  const onChangeDate = () => {
    const date = new Date(getValues()['endTime'])
    setEndTime(date);
    const tarih=new Date()
    const msDay = 60*60*24*1000;
    const fark=Math.floor((date.getTime() - tarih.getTime()) / msDay);
    setInfo(undefined)
    console.log(Math.floor((date.getTime() - tarih.getTime()) / msDay) + 'gün farkı');
    if(date<tarih){
      setbtnEnable("Şeçim süresi küçük")
    }
    else{
      setbtnEnable(undefined)
      if(fark===0){
        setInfo("Secilen tarih 1 günden az, ödenecek tutar 1 TL. Bu tutar cüzdan bakiyesinden alınacaktır.")
        setPrice("1");
      }
      else if(fark<=5){
        setInfo("Secilen tarih 1-5 gün arasında, ödenecek tutar 3 TL. Bu tutar cüzdan bakiyesinden alınacaktır.")
        setPrice("3");
      }
      else if( fark<=10){
        setInfo("Secilen tarih 6-10 gün arasında, ödenecek tutar 7 TL. Bu tutar cüzdan bakiyesinden alınacaktır.")
        setPrice("7");
      }
      else if( fark>10){
        setInfo("Secilen tarih 10 günden büyük, ödenecek tutar 15 TL. Bu tutar cüzdan bakiyesinden alınacaktır.")
        setPrice("15");
      }
    }

    console.log(tarih);
  };
  useEffect(() => {
      notify();
  }, [info])
  return(
    <>
    <Popup show={showcase} onHide={handleCloseShowcase}>
      {productName} isimli ürünü vitrine eklemek üzeresiniz.
      <Accordion defaultActiveKey="0" className="mt-2">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Vitrin
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
                <p>Vitrinde Kalma Süresi</p>
              <StyledInput
                type="date"
                name="endTime"
                ref={register({ required: true })}
                onChange={onChangeDate}
                errors={errors}
              />
              <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <button type="submit" className="btn btn-success mt-3 " disabled={btnEnable}>Ekle</button>
                {btnEnable?(<p>{btnEnable}</p>):(null)}
              </StyledForm>
             </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Popup>
      <ToastContainer position={'bottom-right'}/>
      </>
  );
}
