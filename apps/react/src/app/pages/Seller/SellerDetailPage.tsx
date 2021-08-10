import React, { useEffect, useState } from 'react';
import {Button, Container} from 'react-bootstrap';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {CKEditor} from "ckeditor4-react";
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button2, Card, InfoAlerts} from "@internship/ui";
import {sellerBeginAsync} from "@internship/store/authentication";
import Moment from 'moment';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import {api} from "@internship/shared/api";
import {SellerDetailResponse} from "../../../../../../libs/shared/api/src/lib/api/Auth";
import {ClipLoader} from "react-spinners";
import {SellerViewPage} from "./SellerViewPage";

const StyledP=styled.p`
width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledClipLoader=styled.div`
margin: auto;
margib-top:50px;
`;
export const SellerDetailPage=()=>{
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();
  const [item, setItem] = useState( JSON.parse(localStorage.getItem('cloud_users')));
  const history = useHistory();
  const [sellerDetail, setSellerDetail] = useState<SellerDetailResponse[]>();
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const [detailShow,setDetailShow]=useState(false);
  const [content,setContent]=useState("");
  const [contentId,setContentId]=useState("");
  const [userId,setUserId]=useState("");

  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    if (!isAuthenticated || item?.roles?.[0]==="ROLE_CUSTOMER" || item?.roles?.[0]==="ROLE_SELLER") {
      history.push('/');
    }
  }, [isAuthenticated]);

  useEffect(()  => {
    setPedingApiCall(true);
    async function sellerDetailAPI() {
      await api.auth
        .sellerDetail()
        .then((r) => setSellerDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    sellerDetailAPI();
  },[]);
  useEffect(()=>{
    setPedingApiCall(false);
  },[sellerDetail])
  const handleOpenSellerDetail = (content,contentId,userId) => {
    setContent(content);
    setContentId(contentId);
    setUserId(userId);
    setDetailShow(true);
  };
  const handleCloseSellerDetail = () => {
    setDetailShow(false);
  };

  return(
    <Container>
      {pedingApiCall?(
        <StyledClipLoader>
          <ClipLoader size="100px"/>
        </StyledClipLoader>):(
        <Card>
          <Container>
            <h3 className='text-black-50 text-center mt-2'><p>Satıcı Başvuruları</p></h3>
            <table className="table table-hover table-bordered" id="AllBugsTable">
              <thead>
              <tr>
                <th scope="col">İsim Soyisim</th>
                <th scope="col">Başvuru Zamanı</th>
                <th scope="col">Detay</th>
              </tr>
              </thead>
              <tbody>
              {sellerDetail?.map(detail => (
                <tr key={detail.id} className="table table-striped table-hover">
                  <td>
                    <StyledP>{detail.user.name} {detail.user.lastname} </StyledP>
                  </td>
                  <td>
                    <div> {Moment(detail.timestap).format('DD MMM, YYYY')} </div>
                  </td>
                  <td className="text-center">
                    <Button className="btn btn-sm mt-2" variant="outline-info" onClick={() =>handleOpenSellerDetail(detail.content,detail.id,detail.user.id)}>
                      Detayı Göster
                    </Button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </Container>
        </Card>
      )}
      {detailShow?(
        <SellerViewPage
          handleCloseSellerDetail={handleCloseSellerDetail}
          setDetailShow={setDetailShow}
          handleOpenSellerDetail={handleOpenSellerDetail}
          content={content}
          contentId={contentId}
          userId={userId}
        />
      ):(null)}

       </Container>
  );

}

