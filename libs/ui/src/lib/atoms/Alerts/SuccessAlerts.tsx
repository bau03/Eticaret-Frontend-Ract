import { FcCheckmark } from 'react-icons/all';
import React from 'react';

export const SuccessAlerts = ({children, ...props}) => {
  return <div className="alert alert-success" role="alert" {...props}>
    <FcCheckmark size={'25px'} className={'mr-1 mb-1'}/>BAŞARILI
    <hr/>
    {children}
  </div>;
};
