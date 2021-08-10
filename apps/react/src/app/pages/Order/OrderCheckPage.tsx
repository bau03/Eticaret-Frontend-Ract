import React, {useEffect, useState} from 'react';
import {Button2, Input, PopupButton} from '@internship/ui';
import styled from 'styled-components';
import {Col, Container, Form, FormCheck, Row} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useTemporary } from '@internship/shared/hooks';
import {adressAddAsync, orderAsync} from "@internship/store/authentication";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {api} from "@internship/shared/api";
import {UserAdressDetailResponse} from "../../../../../../libs/shared/api/src/lib/api/Auth";
import {ClipLoader} from "react-spinners";
import { useParams } from 'react-router-dom';
type OrderCheckProps = {
  showProfileEdit;
  handleCloseProfileEdit;
  handleShowProfileEdit;
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

export const OrderCheckPage: React.FC<OrderCheckProps> = ({ showProfileEdit, handleCloseProfileEdit, handleShowProfileEdit }) => {
  const { handleSubmit, register, errors, getValues, reset } = useForm();
  const dispatch = useDispatch();
  const [userAdressDetail, setUserAdressDetail] = useState<UserAdressDetailResponse[]>();
  const [adresId, setAdresId] = useState("");
  const [item, setItem] = useState( JSON.parse(localStorage.getItem('cloud_users')));
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const [btnEnable,setBtnEnable]=useState(false);
  const [message,setMessage]=useState();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const { price } = useParams();
  const notify = () => toast.success(isSuccessRequired);
  useEffect(()  => {
    setPedingApiCall(true)
    async function adressDetailAPI() {
      await api.auth
        .userAdressDetail(item?.id)
        .then((r) => setUserAdressDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    adressDetailAPI();
  },[]);

  useEffect(() => {
    if(userAdressDetail){
      setPedingApiCall(false);
    }
  }, [userAdressDetail]);

  useEffect(() => {
    if(isSuccessRequired==='Sipariş alındı satıcı tarafından onay bekleniyor.'){
      notify();
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
  }, [isSuccessRequired])

  const onSubmitAbout = async (values) => {
    await dispatch(adressAddAsync.request(values));
    await handleCloseProfileEdit();
    await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };

  const onSubmitOrder = async (values) => {
    setBtnEnable(true);
    values = {...values,price:price};
    values = {...values,adress:adresId};
    await dispatch(orderAsync.request(values));
    await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };

/*  const addOrder=(addressId)=>{
    api.auth.orderAdd(addressId,price).then((r) => setMessage(r.message))
      .catch((e) => console.error(e));
  }*/
  //orderAdd
console.log("adssad"+userAdressDetail)
  return (
    <Container>
      {pedingApiCall?(<ClipLoader size="100px"/>):(
        <>
          {userAdressDetail?.[0]?(
            <Form onSubmit={handleSubmit(onSubmitOrder)}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" className={"mt-3"}>
                Teslimat adresi
              </Form.Label>
              <Col sm={5}>
              {userAdressDetail?.map(adress => (
                <div key={adress.id}>
                  <Form.Check
                    type="radio"
                    label={"Adres Tipi:"+adress.adressType+" "+adress.street+"/"+adress.buildingNumber+"/"+adress.district+"/"+adress.province}
                    name="adressId"
                    id="formHorizontalRadios1"
                    onClick={() => {setAdresId(adress.id)}}
                  />
                </div>
              ))}
              </Col>
            </Form.Group>
              <Row>
                <Button2 type={"submit"} disabled={btnEnable}>Onayla</Button2>
              </Row>
              </Form>
          ):(
            <StyledForm  className="my-sm-0" onSubmit={handleSubmit(onSubmitAbout)}>
              <p>Adres Bilgilerinizi Giriniz.</p>
              <StyledInput
                type="text"
                placeholder="Adres Tipi(Ev-İş vb.)"
                name="adressType"
                ref={register({ required: true })}
                errors={errors}
              />
              <StyledInput
                type="text"
                placeholder="Ülke(*)"
                name="country"
                ref={register({ required: true })}
                errors={errors}
              />
              <StyledInput
                type="text"
                placeholder="İl(*)"
                name="province"
                ref={register({ required: true })}
                errors={errors}
              />
              <StyledInput
                type="text"
                placeholder="İlçe(*)"
                name="district"
                ref={register({ required: true })}
                errors={errors}
              />
              <StyledInput
                type="text"
                placeholder="Sokak(*)"
                name="street"
                ref={register({ required: true })}
                errors={errors}
              />
              <StyledInput
                type="text"
                placeholder="Bina Numarası(*)"
                name="buildingNumber"
                ref={register({ required: true })}
                errors={errors}
              />

              {isSuccessRequired ? (<StyledSuccessLabel>{isSuccessRequired}</StyledSuccessLabel>) : (null)}
              <button type="submit" className="btn btn-success mt-3 ">Ekle</button>
            </StyledForm>
          )}
        </>
      )}
      <ToastContainer position={'bottom-right'}/>
    </Container>

  );
};
