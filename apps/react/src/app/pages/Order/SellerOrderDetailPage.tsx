import React, { useEffect, useState } from 'react';
import {OrderDetailResponse} from "../../../../../../libs/shared/api/src/lib/api/Auth";
import {api} from "@internship/shared/api";
import { useDispatch } from 'react-redux';
import {Card} from "@internship/ui";
import {Container} from "react-bootstrap";
import Moment from "moment";
import styled from "styled-components";
import {toast, ToastContainer} from "react-toastify";
import {ClipLoader} from "react-spinners";

const StyledP=styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SellerOrderDetailPage=()=>{
  const [orderDetail,setOrderDetail]=useState<OrderDetailResponse[]>();
  const [message,setMessage]=useState();
  const dispatch = useDispatch();
  const [pedingApiCall,setPedingApiCall]=useState(false);
  const notify = () => toast.success(message);
  const errorNotify = () => toast.error(message);
  useEffect(()  => {
    setPedingApiCall(true);
    async function orderDetailAPI() {
      await api.auth
        .orderSellerView()
        .then((r) => setOrderDetail(r))
        .catch((e) => console.error(e));
      await dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      await dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    orderDetailAPI();
  },[message]);

  useEffect(() => {
    if(orderDetail){
      setPedingApiCall(false);
    }
  }, [orderDetail]);

  useEffect(() => {
    if(message==='Sipariş Onaylandı'){
      notify();
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    if (message==='Sipariş Silindi'){
      errorNotify();
      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    }
    setMessage(null);
  }, [message])
  const editOrder=(orderId)=>{
    setPedingApiCall(true);
    api.auth.editOrder(orderId).then((r) => setMessage(r.message))
      .catch((e) => console.error(e));
  }
  const deleteOrder=(orderId)=>{
    setPedingApiCall(true);
    api.auth.deleteOrder(orderId).then((r) => setMessage(r.message))
      .catch((e) => console.error(e));
  }
  return(
    <Container>
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
            <th scope="col">Sipariş veren kullanıcı</th>
            <th scope="col">Sipariş Onayı</th>
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
                  <td className="text-center">
                    {order.user.username}
                  </td>
                  <td className="text-center">
                    {pedingApiCall?(<ClipLoader/>):(<>
                      <button type="submit" className="btn btn-outline-success btn-sm"
                              onClick={() =>editOrder(order.id)}> <b>V</b></button>
                      <button type="submit" className="btn btn-outline-danger btn-sm ml-1"
                              onClick={() =>deleteOrder(order.id)}> <b>X</b></button>
                    </>)}
                  </td>
                </>
              ):(null)}
            </tr>
          ))}
          </tbody>
        </table>
      </Container>
    </Card>
      <ToastContainer position={'bottom-right'}/>
    </Container>
  );
}
