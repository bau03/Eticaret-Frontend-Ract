import React from 'react';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '@internship/shared/types';
import { Redirect } from 'react-router-dom';
import { googleLogin, loginAsync } from '@internship/store/authentication';
import { useDispatch } from "react-redux";

export const OAuth2RedirectHandler = (props) => {
  const getUrlParameter = (name) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(props.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };
  const refreshToken = getUrlParameter('refreshToken');
  const accessToken = getUrlParameter('accessToken');
  const error = getUrlParameter('error');
  const dispatch = useDispatch();
  console.log('Token' + accessToken);
  console.log('errror' + error);
  console.log(props.location.search);
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    dispatch(googleLogin());
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: props.location },
        }}
      />
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: {
            from: props.location,
            error: error,
          },
        }}
      />
    );
  }
};
