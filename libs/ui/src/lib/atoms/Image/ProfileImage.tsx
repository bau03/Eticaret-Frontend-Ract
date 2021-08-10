import React from 'react';
export const ProfileImage = ({ ...props}) => {
  const {image}=props;
  return <img className="rounded-circle shadow" alt={`Profile`} src={image} {...props}/>
};
