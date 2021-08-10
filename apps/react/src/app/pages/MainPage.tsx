import React, { useEffect, useState } from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import styled from 'styled-components';
import { AiFillEye, AiFillLike, AiFillDislike, FaComment } from 'react-icons/all';
import {api} from '@internship/shared/api';
import {useAuthentication, useTemporary} from '@internship/shared/hooks';
import { useDispatch } from 'react-redux';
import {Button2, ProfileImage} from '@internship/ui';
import Moment from 'moment';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import {ProductDetailResponse} from "../../../../../libs/shared/api/src/lib/api/Auth";
import {addProductAsync, addShoppingProductAsync} from "@internship/store/authentication";
import {useForm} from "react-hook-form";
import {toast, ToastContainer} from "react-toastify";


const StyledCard=styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  margin: 10px;
  border-radius: 15px;
  width: 330px;
  height: 635px;
  background-color: #f1f1f1;
  flex-grow: 0;
`;
const StyledImageCard=styled.div`
  position: relative;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 50%;
  background-color: rgb(241, 108, 108);
  background: linear-gradient(45deg, #fa3939, rgb(240, 156, 156));
  flex-grow: 0;
`;
const StyledTitleCard=styled.h5`
  margin: 20px 0 10px 0;
   height: 5%;
  text-align: center;
  flex-grow: 0;
    overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledInfoCard=styled.p`
  margin: 0;
  padding: 10px 30px 0 30px;
  height: 10%;
  font-size: 15px;
  line-height: 18px;
  text-align: justify;
  flex-grow: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledImage=styled.img`
  position: relative;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 100%;
  width: 100%;
  background-color: rgb(241, 108, 108);
  background: linear-gradient(45deg, #fa3939, rgb(240, 156, 156));
  flex-grow: 0;
`;
const StyledBtnDiv=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  flex-grow: 0;
`;
const StyledProfileImage=styled(ProfileImage)`
    height: 50px;
    width: 50px;
    border-radius: 50%;
`;
const StyledLink=styled(Link)`
margin-left:5px;
border:none;
`;

export const MainPage = () => {
  const dispatch = useDispatch();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const [productsDetail, setProductsDetail] = useState<ProductDetailResponse[]>();
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const { handleSubmit} = useForm();
  const { isAuthenticated } = useAuthentication();
  const [data,setData]=useState(null);

  useEffect(()  => {
    setPedingApiCall(true);
    async function sellerDetailAPI() {
      await api.auth
        .productsUserDetail()
        .then((r) => setProductsDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    sellerDetailAPI();
  },[]);
  const onSubmit = async (values) => {
    values = {...values,productId:data};
    await dispatch(addShoppingProductAsync.request(values));
  };
  useEffect(() => {
    if(productsDetail){
      setPedingApiCall(false);
    }
  }, [productsDetail]);
  const notify = () => toast.success(isSuccessRequired);
  useEffect(() => {
    if(isSuccessRequired==='Ürün sepete eklendi.'){
      notify();
       dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
       dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
  }, [isSuccessRequired])

  return (
    <Container className="mt-3">
      {pedingApiCall?(
        <ClipLoader/>
      ):(<>
          <Row className="flex-grow-0">
            {productsDetail?.map(products => (
              <div key={products.id}>
                <Col className="flex-grow-0">
                  <StyledCard>
                    <StyledImageCard>
                      <StyledImage src={products.productImage}></StyledImage>
                    </StyledImageCard>
                    <div className="row mt-2">
                      <div className="col ml-1"><p>{products.categorys[0]?.categorys}</p></div>
                      <div className="col text-lg-right mr-1"> <p>
                        {Moment(products.timestap).format('DD MMM, YYYY')}
                      </p></div>
                    </div>
                    <StyledTitleCard>
                      {products.productName}
                    </StyledTitleCard>

                    <StyledInfoCard>
                      <StyledProfileImage image={'../../../assets/ProfilePics/profileImage.jfif'}/>
                      <StyledLink className="btn btn-outline-secondary btn-sm"   to={'/profile/' + products.user.id}>
                        <b>{products.user.username}</b>
                      </StyledLink>
                    </StyledInfoCard>
                    <StyledInfoCard>
                      <p>
                        <div className={"editor h-auto w-auto ml-4"} dangerouslySetInnerHTML={{ __html: products?.explanation}} />
                      </p>
                    </StyledInfoCard>
                    <StyledInfoCard>
                      <p className={"h-auto w-auto ml-4 text-black-50"}>
                        {products.price} ₺
                      </p>
                    </StyledInfoCard>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                    <StyledBtnDiv>
                      {isAuthenticated?(
                        <button type="submit" className="btn btn-outline-secondary btn-sm"
                                onClick={() => {setData(products.id)}}> <b>Sepete Ekle</b></button>
                      ):(<p className={"m-sm-n4"}>Üye Girişi yapmadan alışveriş yapamazsınız</p>)}

                    </StyledBtnDiv>
                    </Form>
                  </StyledCard>
                </Col>
              </div>
            ))}
          </Row>
        </>
      )}
      <ToastContainer position={'bottom-right'}/>
    </Container>
  );
};
