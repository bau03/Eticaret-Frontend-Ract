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
import {Button2, Card, CloseButton, InfoAlerts} from "@internship/ui";
import {sellerBeginAsync, sellerBeginEditAsync} from "@internship/store/authentication";
import Moment from 'moment';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import {api} from "@internship/shared/api";
import {SellerDetailResponse} from "../../../../../../libs/shared/api/src/lib/api/Auth";
import {ClipLoader} from "react-spinners";
import {IoIosClose} from "react-icons/all";
import { MDBCloseIcon } from "mdbreact"
type SellerViewProps = {
  setDetailShow;
  handleOpenSellerDetail;
  handleCloseSellerDetail;
  content;
  userId;
  contentId;
};
const StyledP=styled.p`
width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledClipLoader=styled.div`
margin: auto;
margib-top:50px;
`;
export const SellerViewPage: React.FC<SellerViewProps> = ({
                                                            setDetailShow,
                                                            handleOpenSellerDetail,
                                                            handleCloseSellerDetail,
                                                            userId,
                                                            content,
                                                            contentId
                                                          }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();
  const [item, setItem] = useState( JSON.parse(localStorage.getItem('cloud_users')));
  const history = useHistory();
  const [sellerDetail, setSellerDetail] = useState<SellerDetailResponse[]>();
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const { handleSubmit, register } = useForm();
console.log("userrrrrrr:"+userId);
console.log("contentIddddd"+contentId);
  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    if (!isAuthenticated || item?.roles?.[0]==="ROLE_CUSTOMER" || item?.roles?.[0]==="ROLE_SELLER") {
      history.push('/');
    }
  }, [isAuthenticated]);

  const onSubmit = async (values) => {
    values = {...values,id:contentId};
    values = {...values,userid:userId};
    await dispatch(sellerBeginEditAsync.request(values));
  };
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
  return(
    <Container>
      {pedingApiCall?(
        <StyledClipLoader>
          <ClipLoader size="100px"/>
        </StyledClipLoader>):(
        <Card>

            <IoIosClose className={"ml-auto  mb-n3 mt-sm-1 m-3"} size={"40px"} onClick={handleCloseSellerDetail}/>


          <Container>
            <h3 className='text-black-50 text-center mt-2'><p>İsimli Satıcı Başvurusu</p></h3>
          </Container>
          <Container>
            <p>
          <div className={"editor h-auto w-auto ml-4"} dangerouslySetInnerHTML={{ __html: content}} />
            </p>
          </Container>
          <div className={"mx-auto"}>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Button2 type="submit">Onayla</Button2>
            </Form>
          </div>

        </Card>
      )}
    </Container>
  );

}
