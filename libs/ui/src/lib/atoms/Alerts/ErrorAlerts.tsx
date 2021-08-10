import { MdError } from 'react-icons/all';
import React from 'react';

export const ErrorAlerts = ({children, ...props}) => {
  return <div className="alert alert-danger" role="alert" {...props}>
    <MdError size={'25px'} className={'mr-1 mb-1'}/>HATA
    <hr/>
    {children}
  </div>;
};
