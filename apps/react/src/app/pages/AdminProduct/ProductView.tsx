import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { api } from '@internship/shared/api';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useAuthentication } from '@internship/shared/hooks';
import {Button2, Card, ProfileImage} from '@internship/ui';
import styled from 'styled-components';
import Moment from 'moment';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import {ProductDetailResponse} from "../../../../../../libs/shared/api/src/lib/api/Auth";
import {toast, ToastContainer} from "react-toastify";

const StyledProfileImage=styled(ProfileImage)`
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-top:28px;
    margin-left:30px;
`;
const StyledUserName=styled.p`
    margin-top:30px;
    margin-left:10px;
    font-size: 15px;
`
const StyledHr = styled.div`
    content: '';
    width: %100;
    height: 1px;
    background: #dee3ed;
    margin-top: 5px;
    margin-bottom: 12px;
    margin-left: 20px;
    margin-right: 20px;
`;
const StyledP=styled.p`
 cursor: pointer;
`;
const StyledImage=styled.img`
  position: relative;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  height: 300px;
  width: 300px;
  background-color: rgb(241, 108, 108);
  background: linear-gradient(45deg, #fa3939, rgb(240, 156, 156));
  flex-grow: 0;
  margin:auto;
  display: flex;
`;
const StyledButton=styled(Button2)`
  margin:auto;
  display: flex;
  margin-bottom:15px;
`;

export const ProductView=()=>{
  const dispatch = useDispatch();

  const [detail, setDetail] = useState<ProductDetailResponse>();
  const [messages, setMessages] = useState({message:""});
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const { productId } = useParams();
  const { isAuthenticated } = useAuthentication();
  const [item, setItem] = useState(JSON.parse(localStorage.getItem('cloud_users')));

  useEffect(()  => {
    setPedingApiCall(true);
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    async function productAPI() {
      await api.auth
        .productsView(productId)
        .then((r) => setDetail(r))
        .catch((e) => console.error(e));
      await setPedingApiCall(false)
    }
    productAPI();
  },[]);

  const notify = () => toast.success(messages?.message);
  useEffect(() => {
    if(messages?.message==='Ürün Yayınlandı'){
      notify();
    }
  }, [messages])

  const onClick=()=>{
    api.auth.productsEdit(productId).then((r) => setMessages({message:r.message}))
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    if(detail){
      setPedingApiCall(false);
    }
  }, [detail]);

  return (
    <Container>
      {pedingApiCall?(<ClipLoader/>):(
        <Card>
          <Row>
            <StyledProfileImage image={'../../../assets/ProfilePics/profileImage.jfif'}/>
            <Link className="btn btn-sm mt-2" variant="outline-primary" to={'/profile/'}>
              <StyledUserName>{detail?.user?.username}</StyledUserName>
            </Link>
          </Row>
          <Row>
            <Col>
              <h4>
                <p className={'ml-5 mt-3 text-break'}><b>{detail?.productName}</b></p>
              </h4>
            </Col>
            <Col>
              <p className={'mr-5 mt-3  text-lg-right'}>
                {Moment(detail?.timestap).format('DD MMM, YYYY')}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={'ml-5 mt-3 text-break'}><b>Ürün Fiyatı: {detail?.price}</b></p>
              <p className={'ml-5 mt-3 text-break'}><b>Ürün Stok Sayısı: {detail?.stock}</b></p>
            </Col>
            <Col>
            <p className={'mr-5 mt-3  text-lg-right'}>
              {detail?.categorys?.[0]?.categorys}
            </p>
            </Col>

          </Row>
          <StyledHr/>
          <Row>
            <Col>
              <StyledImage src={detail?.productImage}></StyledImage>
            </Col>
          </Row>
          <Row>
            <Col className={'ml-4'}>
              <Container>
                <p>
                  <div className={"editor h-auto w-auto ml-4"} dangerouslySetInnerHTML={{ __html: detail?.explanation}} />
                </p>
              </Container>
            </Col>
          </Row>
          <StyledButton onClick={onClick}>Ürünü Onayla</StyledButton>
        </Card>
      )}

      {/*<>
        {isAuthenticated?(
          <AddFavorites show={show} handleClose={handleClose} handleShow={handleShow} ArticleId={articleId} isArticleInFavorites={detail?.data?.favorites?.some((element) => element.userId===item.userId)}/>
        ):(null)}
        <LikeAndDislikeView show={showLike} handleClose={handleLikeClose} handleShow={handleLikeShow} ArticleId={articleId} likeType={likeType}/>
      </>*/}
      <ToastContainer position={'bottom-right'}/>
    </Container>
  );
}
