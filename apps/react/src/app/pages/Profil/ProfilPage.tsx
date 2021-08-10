import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {FiSettings} from 'react-icons/all';
import { Card, ProfileImage } from '@internship/ui';
import { useDispatch } from 'react-redux';
import {api,} from '@internship/shared/api';
import { ClipLoader } from 'react-spinners';
import { useTemporary } from '@internship/shared/hooks';
import { EditProfile } from './EditProfile';
import { Link } from 'react-router-dom';
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  OrderDetailResponse,
  ProductDetailResponse,
  PurseDetailResponse,
  UserAdressDetailResponse,
  UserDetailResponse
} from "../../../../../../libs/shared/api/src/lib/api/Auth";
import Moment from "moment";
import {Showcase} from "./Showcase";

const StyledHeaderDiv=styled.div`
background-color:red;
height:150px;
border-radius: 10px;
background: #16222A;
background: -webkit-linear-gradient(to right, #3A6073, #16222A);
background: linear-gradient(to right, #3A6073, #16222A);

`;
const StyledProfileImage=styled(ProfileImage)`
    height: 100px;
    width: 100px;
    border: 1px solid #FFF;
    border-radius: 50%;
    padding: 7px;
    position: absolute;
    margin-top: 90px;
    margin-left: 30px;
`;
const StyledUserSettingsDiv=styled.div`
    display:flex;
    flex-direction: column;
    text-align:end;
    margin-top:5px;
    margin-right:5px;
`;
const StyledUserDetailDiv=styled.div`
    display:flex;
    flex-direction: column;
    margin-top:5px;
    margin-left:5px;
`;
const StyledUserNameLabel=styled.h4`
    font-family: monospace;
    font-weight: bold;
`;
const StyledUserAccountLabel=styled.h6`
    font-family: monospace;
    font-size:14px;
`;
const StyledUserHistoryLabel=styled.div`
    font-family: monospace;
`;
const StyledUserHistoryTitle=styled.div`
    text-align: center;
    font-size:20px;
    font-family: -webkit-body;
`;
const StyledUl=styled.ul`
list-style-type:none;
`;
const StyledClipLoader=styled.div`
margin: auto;
margib-top:50px;
`;
const StyledP=styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledHr = styled.div`
    content: '';
    width: %100;
    height: 1px;
    background: #dee3ed;
    margin-top: 5px;
    margin-bottom: 12px;
`;

export const ProfilPage=()=>{
  const dispatch = useDispatch();
  const [setingEnable, setSetingEnable] = useState(false);
  const [item, setItem] = useState( JSON.parse(localStorage.getItem('cloud_users')));
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const [productName,setProductName]=useState();
  const [productId,setProductId]=useState();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showcase, setShowcase] = useState(false);
  const [userDetail, setUserDetail] = useState<UserDetailResponse>();
  const [userAdressDetail, setUserAdressDetail] = useState<UserAdressDetailResponse[]>();
  const [orderDetail,setOrderDetail]=useState<OrderDetailResponse[]>()
  const [purseDetail, setPurseDetail] = useState<PurseDetailResponse>();
  const [userRole,setUserRole]=useState();
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const [productDetail, setProductDetail] = useState<ProductDetailResponse[]>();
  const [show,setShow]=useState(false);
  const notify = () => toast.success(isSuccessRequired);

  useEffect(()  => {
    setPedingApiCall(true);
    async function detailAPI() {
      await api.auth
        .userDetail()
        .then((r) => setUserDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    async function productDetailAPI() {
      await api.auth
        .productsUserView(item.id)
        .then((r) => setProductDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    detailAPI();
    productDetailAPI();
  },[]);

  useEffect(()  => {
    async function adressDetailAPI() {
      await setUserRole(userDetail?.authorities[0]?.authority);
      await api.auth
        .userAdressDetail(userDetail?.id)
        .then((r) => setUserAdressDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }

    adressDetailAPI();
  },[userDetail]);

  useEffect(()  => {
    async function purseDetailAPI() {
      await api.auth
        .purseDetail()
        .then((r) => setPurseDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    purseDetailAPI();
  },[show||isSuccessRequired==="Ürün vitrine eklendi."]);

  useEffect(()  => {
  if(isSuccessRequired==="Ürün vitrine eklendi."){
    notify();
  }
  },[isSuccessRequired]);

  useEffect(()  => {
    async function orderDetailAPI() {
      await api.auth
        .orderUserView()
        .then((r) => setOrderDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    orderDetailAPI();
  },[userRole==="ROLE_CUSTOMER"]);

  useEffect(() => {
    if(userAdressDetail){
      setPedingApiCall(false);
    }
  }, [userAdressDetail]);

  const handleOpenProfileEdit = () => {
    setShowProfileEdit(true);
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };

  const handleCloseProfileEdit = () => {
    setShowProfileEdit(false);
  };

  const handleShowProfileEdit =  () => {
    setShowProfileEdit(false);
  };

  const handleOpenShowcase = (productName,productId) => {
    setProductName(productName)
    setProductId(productId)
    setShowcase(true);
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };

  const handleCloseShowcase = () => {
    setShowcase(false);
  };

  const handleShowcase =  () => {
    setShowcase(false);
  };

  return(
    <Container>
      {pedingApiCall?(
      <StyledClipLoader>
        <ClipLoader size="100px"/>
      </StyledClipLoader>):(
        <>
        <Card>
          <StyledHeaderDiv/>
          <StyledProfileImage image={'../../../assets/ProfilePics/profileImage.jfif'}/>
          <StyledUserSettingsDiv>
            <p><FiSettings size={'30px'} type={'button'} onClick={handleOpenProfileEdit}/></p>
          </StyledUserSettingsDiv>
          <StyledUserDetailDiv>
            <StyledUserNameLabel>{userDetail?.name} {userDetail?.lastName}</StyledUserNameLabel>
            <StyledUserAccountLabel>Cüzdan Bakiyesi: {purseDetail?.balance} TL</StyledUserAccountLabel>
            <StyledUserAccountLabel>Cüzdan Bakiyesini Son Güncellenme Tarihi:  {Moment(purseDetail?.timestap).format('DD MMMM, YYYY,HH:MM')}</StyledUserAccountLabel>
            <StyledHr/>
            <StyledUserHistoryLabel>
              <StyledUserHistoryTitle>
                {"Satıcı Hakkında"}
              </StyledUserHistoryTitle>
              <StyledUl className={'mt-2'}>
                <p>Satıcı Hakkında</p>
              </StyledUl>
            </StyledUserHistoryLabel>
          </StyledUserDetailDiv>
        </Card>
          {!userAdressDetail?.[0] ? (null):(
            <Card>
              <Container>
                <h3 className='text-black-50 text-center mt-2'><p>Adres Bilgileri</p></h3>
                <table className="table table-hover table-bordered" id="AllBugsTable">
                  <thead>
                  <tr>
                    <th scope="col">Adres</th>
                    <th scope="col">Ülke</th>
                    <th scope="col">Adres Tipi</th>
                  </tr>
                  </thead>
                  <tbody>
                  {userAdressDetail?.map(adress => (
                    <tr key={adress.id} className="table table-striped table-hover">
                      <td>
                        <StyledP>{adress.street} {adress.buildingNumber} {adress.district}/{adress.province} </StyledP>
                      </td>
                      <td>
                        {adress.country}
                      </td>
                      <td className="text-center">
                        {adress.adressType}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </Container>
            </Card>
          )}
          {userRole==="ROLE_CUSTOMER"?(
            <>
              <Card>
                <Container>
                  <h3 className='text-black-50 text-center mt-2'><p>Onaylanmış Siparişler</p></h3>
                  <table className="table table-hover table-bordered" id="AllBugsTable">
                    <thead>
                    <tr>
                      <th scope="col">Adres Tipi</th>
                      <th scope="col">Adres</th>
                      <th scope="col">Sipariş Zamanı</th>
                      <th scope="col">Ürün isimleri</th>
                      <th scope="col">Tutar</th>

                    </tr>
                    </thead>
                    <tbody>
                    {orderDetail?.map(order => (
                      <tr key={order.id} className="table table-striped table-hover">
                        {order.enabled?(
                          <>
                            <td>
                              <StyledP>{order.adress.adressType}
                              </StyledP>
                            </td>
                            <td>
                              {order.adress.province} {order.adress.district} {order.adress.street}
                              {order.adress.buildingNumber}
                            </td>
                            <td className="text-center">
                              {Moment(order.timestamp).format('DD MMM, YYYY')}
                            </td>
                            <td className="text-center">
                                  <ul>
                                    <li>
                                      <p>{order.product.productName}</p></li>
                                  </ul>
                            </td>
                            <td className="text-center">
                              {order.product.price} TL
                            </td>
                          </>
                        ):(null)}
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </Container>
              </Card>

              <Card>
                <Container>
                  <h3 className='text-black-50 text-center mt-2'><p>Onay Bekleyen Siparişler</p></h3>
                  <table className="table table-hover table-bordered" id="AllBugsTable">
                    <thead>
                    <tr>
                      <th scope="col">Adres Tipi</th>
                      <th scope="col">Adres</th>
                      <th scope="col">Sipariş Zamanı</th>
                      <th scope="col">Ürün isimleri</th>
                      <th scope="col">Tutar</th>

                    </tr>
                    </thead>
                    <tbody>
                    {orderDetail?.map(order => (
                      <tr key={order.id} className="table table-striped table-hover">
                        {!order.enabled?(
                          <>
                            <td>
                              <StyledP>{order.adress.adressType}
                              </StyledP>
                            </td>
                            <td>
                              {order.adress.province} {order.adress.district} {order.adress.street}
                              {order.adress.buildingNumber}
                            </td>
                            <td className="text-center">
                              {Moment(order.timestamp).format('DD MMM, YYYY')}
                            </td>
                            <td className="text-center">
                                  <ul>
                                    <li>
                                      <p>{order.product.productName}</p></li>
                                  </ul>
                            </td>
                            <td className="text-center">
                              {order.product.price} TL
                            </td>
                          </>
                        ):(null)}
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </Container>
              </Card>
            </>
          ):(<>
            <Card>
              <Container>
                <h3 className='text-black-50 text-center mt-2'><p>Onaylanmış Ürünler</p></h3>
                <table className="table table-hover table-bordered" id="AllBugsTable">
                  <thead>
                  <tr>
                    <th scope="col">Ürün İsmi</th>
                    <th scope="col">Fiyat</th>
                    <th scope="col">Stok</th>
                    <th scope="col">Vitrin</th>
                  </tr>
                  </thead>
                  <tbody>
                  {productDetail?.map(product => (
                    <tr key={product.id} className="table table-striped table-hover">
                      {product.enabled?(
                        <>
                          <td>
                            <StyledP>{product.productName}</StyledP>
                          </td>
                          <td>
                            {product.price}
                          </td>
                          <td className="text-center">
                            {product.stock}
                          </td>
                          <td className="text-center">
                            {!product.showcaseEnabled?(
                              <Link className="btn btn-sm mt-2" variant="outline-primary"
                                    onClick={() => handleOpenShowcase(product.productName,product.id)}
                              >
                                {' '}
                                <b>Vitrinde Sergile</b>
                              </Link>
                            ):(
                             <b> <p>Ürün Vitrinde Sergilenmekte !</p></b>
                            )}

                          </td>
                        </>
                      ):(null)}

                    </tr>
                  ))}
                  </tbody>
                </table>
              </Container>
            </Card>
            <Card>
              <Container>
                <h3 className='text-black-50 text-center mt-2'><p>Onay Bekleyen Ürünler</p></h3>
                <table className="table table-hover table-bordered" id="AllBugsTable">
                  <thead>
                  <tr>
                    <th scope="col">Ürün İsmi</th>
                    <th scope="col">Fiyat</th>
                    <th scope="col">Stok</th>
                  </tr>
                  </thead>
                  <tbody>
                  {productDetail?.map(product => (
                    <tr key={product.id} className="table table-striped table-hover">
                      {!product.enabled?(
                        <>
                          <td>
                            <StyledP>{product.productName}</StyledP>
                          </td>
                          <td>
                            {product.price}
                          </td>
                          <td className="text-center">
                            {product.stock}
                          </td>
                        </>
                      ):(null)}
                    </tr>
                  ))}
                  </tbody>
                </table>
              </Container>
            </Card>
          </>)}

        </>
      )}
        <EditProfile setShow={setShow} showProfileEdit={showProfileEdit} handleCloseProfileEdit={handleCloseProfileEdit} handleShowProfileEdit={handleShowProfileEdit}/>
        <Showcase  productName={productName} productId={productId} showcase={showcase} handleCloseShowcase={handleCloseShowcase} handleShowcase={handleShowcase} setShowcase={handleShowcase}/>
      <ToastContainer position={'bottom-right'}/>
    </Container>
  );
}
