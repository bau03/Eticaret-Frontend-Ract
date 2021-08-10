import { FcInfo } from 'react-icons/all';
import React from 'react';

export const InfoAlerts = ({children, ...props}) => {
  return <div className="alert alert-info" role="alert" {...props}>
    <FcInfo size={'25px'} className={'mr-1 mb-1'}/>BİLGİ
    <hr/>
    {children}
  </div>;
};
