import React, {useEffect, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import styled from "styled-components";
import {Button2} from "@internship/ui";
import {api} from "@internship/shared/api";
import {ClipLoader} from "react-spinners";
import { useDispatch } from 'react-redux';
import { ShoppingDetailResponse} from "../../../../../../libs/shared/api/src/lib/api/Auth";
import { Link, useHistory } from 'react-router-dom';
import {FiSettings, MdDelete} from "react-icons/all";
import {toast, ToastContainer} from "react-toastify";

const StyledContainer=styled.div`
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
`;
const StyledContainerAlt=styled.div`
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
`;
const StyledMain=styled.div`
    padding-bottom: 12rem;
    max-width: calc(120rem - 24.4rem);
    width: 100%;
`;
const StyledBasketItem=styled.div`
    padding-top: 0.8rem;
`;
const StyledHeader=styled.div`
    display: flex;

    padding-right: 0.8rem;
    margin-top:10px;

    position: relative;
    z-index: 1;
`;
const StyledItemList=styled.section`
    display: block;
`;
const StyledItemUl=styled.ul`
    margin: 0;
    padding: 0;
`;
const StyledItemli=styled.li`
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-ms-flex-wrap: wrap;
flex-wrap: wrap;
padding-top: 3.2rem;
border-bottom: 0.1rem solid #e5e5e5;
-webkit-transition: -webkit-box-shadow 200ms linear 0s;
transition: -webkit-box-shadow 200ms linear 0s;
transition: box-shadow 200ms linear 0s;
transition: box-shadow 200ms linear 0s, -webkit-box-shadow 200ms linear 0s;
`;
const StyledItemContent=styled.div`
    display: flex;
    width: 100%;
`;
const StyledImage=styled.img`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 3.1rem;
    margin-right: 1rem;
    margin-left: 0.8rem;
    -ms-flex-item-align: start;
    align-self: flex-start;
    width: 150px;
    height: 150px;
`;
const StyledInfo=styled.div`
    font-size: 1.4rem;
    padding-right: 5.6rem;
    padding-bottom: 1.6rem
`;
const StyledInfoHeader=styled.div`
    max-width: 56.4rem;
    font-weight: 700;
    font-size: 1.6rem;
    margin-bottom: 0.2rem;
    font-stretch: normal;
    color: var(--black);
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
`;
const StyledInfoUser=styled.div`
display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-bottom: 0.4rem;
`;
const StyledInfoPrice=styled.div`
line-height: 3.15;
    min-height: 5.6rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
`;
const StyledPrice=styled.div`
display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
`;
const StyledSideBar=styled.div`

    padding: 2.4rem 0;
    border-radius: 0.8rem;
    border: solid 0.1rem var(--very-light-pink-three);
    background-color: var(--white-two);
`;
const StyledSepet=styled.div`
display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: 1.6rem;
`;
const StyledInfoText=styled.div`

display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-orient: vertical;
-webkit-box-direction: normal;
-ms-flex-direction: column;
flex-direction: column;
color: #484848;
margin-bottom: 1.6rem;
padding: 0 2.3rem;
`;
const StyledText=styled.span`
font-size: 1.2rem;
font-weight: 600;
font-stretch: normal;
font-style: normal;
line-height: 1.5;
letter-spacing: -0.024rem;
color: var(--brownish-grey);
margin-bottom: 0.4rem;
`;
const StyledPriceText=styled.span`
font-size: 2.8rem;
font-weight: 600;
font-stretch: normal;
font-style: normal;
line-height: 1.5;
letter-spacing: 0.033rem;
color: var(--black);
white-space: nowrap;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-align: baseline;
-ms-flex-align: baseline;
align-items: baseline;
`;
const StyledButton=styled.div`
padding: 0 2.3rem;
position: relative;
`;
const StyledCheckButton=styled(Link)`
  border-radius: 12px;
  margin-bottom: 5px;
  margin-top: 5px;
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

export const BasketPage = () => {
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const [price,setPrice]=useState(0);
  const [productsDetail, setProductsDetail] = useState<ShoppingDetailResponse[]>();
  const [message,setMessage]=useState();
  const [btnEnable,setBtnEnable]=useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const notify = () => toast.success(message);

  useEffect(()  => {
    setPedingApiCall(true);
       api.auth
        .shoppingDetail()
        .then((r) => setProductsDetail((r)))
         .catch((e) => console.error(e));
       api.auth.totalPrice()
         .then((r) => setPrice((r))).catch((e) => console.error(e));

       dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
       dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });

  },[message]);

  useEffect(() => {
    if(productsDetail){
      setPedingApiCall(false);
    }

  }, [productsDetail]);

  useEffect(() => {
    if(message==='Ürün Sepetten Silindi'){
      notify();
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    setMessage(null);
  }, [message])

  const deleteProduct=(basketId)=>{
    api.auth.deleteProduct(basketId).then((r) => setMessage(r.message))
      .catch((e) => console.error(e));
  }

  return (
    <Container>
      {pedingApiCall?(
        <ClipLoader/>
      ):(
        <StyledContainer>
          <StyledContainerAlt>
            <StyledHeader><h1>Sepetim</h1></StyledHeader>
            <Row>

                <Col>
                  <StyledBasketItem>
                    {productsDetail?.map(products => (
                      <div key={products.id}>
                        <StyledItemUl>
                          <StyledItemli>
                            <StyledItemContent>
                              <StyledImage src={products.product.productImage}/>
                              <StyledInfo>
                                <StyledInfoHeader>{products.product.productName}
                                  <MdDelete className={"m-auto"} color={"red"} size={"35px"}  type={'button'}
                                            onClick={() => deleteProduct(products.id)}/>
                                </StyledInfoHeader>
                                <StyledInfoUser>Satıcı: {products.product.user.username}</StyledInfoUser>
                                <StyledInfoPrice>
                                  <StyledPrice>Ürün Fiyatı: {products.product.price}</StyledPrice>
                                </StyledInfoPrice>
                              </StyledInfo>
                            </StyledItemContent>
                          </StyledItemli>
                        </StyledItemUl>
                      </div>
                    ))}
                  </StyledBasketItem>
                </Col>

              <Col className={"col-xl-1"}>
                <StyledSideBar>
                  <StyledInfoText>
                    <StyledText>ÖDENECEK TUTAR</StyledText>
                    <StyledPriceText>
                      {price} TL
                    </StyledPriceText>
                  </StyledInfoText>
                  <StyledButton>
                    <StyledCheckButton disabled={btnEnable} className="btn"  to={'/siparis'}>
                      <b>Alışverişi Tamamla</b>
                    </StyledCheckButton>
                  </StyledButton>
                </StyledSideBar>
              </Col>
            </Row>
          </StyledContainerAlt>
        </StyledContainer>
      )}
      <ToastContainer position={'bottom-right'}/>
    </Container>
  );
};
