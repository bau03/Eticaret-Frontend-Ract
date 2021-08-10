import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { AiFillEye, AiFillLike, AiFillDislike, FaComment } from 'react-icons/all';
import {api} from '@internship/shared/api';
import {useAuthentication, useTemporary} from '@internship/shared/hooks';
import { useDispatch } from 'react-redux';
import { ProfileImage } from '@internship/ui';
import Moment from 'moment';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import {ProductDetailResponse} from "../../../../../../libs/shared/api/src/lib/api/Auth";

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
  height: 20%;
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

export const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const { isErrorRequired, isSuccessRequired } = useTemporary();
  const [productsDetail, setProductsDetail] = useState<ProductDetailResponse[]>();
  const [articleLike,setArticleLike]=useState([]);
  const [articleDislikes,setArticleDislike]=useState([]);
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const [page, setPage] = useState({ number: 1 });
  const { isAuthenticated } = useAuthentication();

  useEffect(()  => {
    setPedingApiCall(true);
    async function sellerDetailAPI() {
      await api.auth
        .productsDetail()
        .then((r) => setProductsDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    sellerDetailAPI();
  },[]);

  useEffect(() => {
    if(productsDetail){
      setPedingApiCall(false);
    }
  }, [productsDetail]);

  return (
    <Container className="mt-3">
      {pedingApiCall?(
        <ClipLoader/>
      ):(<>
         {/* {isAuthenticated?(<Trend/>):(null)}*/}
          <Row className="flex-grow-0">
            {productsDetail?.map(products => (
              <div key={products.id}>
                <Col className="flex-grow-0">
                  <StyledCard>
                    <StyledImageCard>
                      <StyledImage src={products.productImage} alt="Red dot" />

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
                    <StyledBtnDiv>
                      <Link className="btn btn-outline-secondary btn-sm"  to={'/productView/'+products.id}>
                        <b>Detayı Göster</b>
                      </Link>
                    </StyledBtnDiv>
                  </StyledCard>
                </Col>
              </div>
            ))}
          </Row>
        </>
      )}
     {/* <Row className="justify-content-md-center">
        <Col xs lg="1">
          {detailArticle?.hasPrevious ? (
            <Button className="btn btn-sm mt-3 mb-3" variant="outline-secondary" onClick={() => setPage({ number: page.number - 1 })}>
              {'<'}
            </Button>
          ) : (null)}
        </Col>
        <Col xs lg="1">
          {detailArticle?.hasNext?(
            <Button className="btn btn-sm mt-3 mb-3" variant="outline-secondary" onClick={() => setPage({ number: page.number + 1 })}>
              {'>'}
            </Button>
          ):(null)}
        </Col>
      </Row>*/}
    </Container>
  );
};
