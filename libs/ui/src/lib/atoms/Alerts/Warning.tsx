import {  TiWarning } from 'react-icons/all';
import React from 'react';

export const Warning = ({children, ...props}) => {
  return <div className="alert alert-warning" role="alert" {...props}>
    <TiWarning size={'25px'} className={'mr-1 mb-1'}/>UYARI
    <hr/>
    {children}
  </div>;
};
