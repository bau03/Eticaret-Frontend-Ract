import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import {FaUser, MdLocalGroceryStore, MdPowerSettingsNew, RiUser3Line} from 'react-icons/all';
import { useAuthentication } from '@internship/shared/hooks';
import { logout } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Popup, PopupButton } from '../../molecules/Popup';

const StyledDropNavHeader = styled(NavDropdown)`
  color: white;
  background-color: #11ffee00;
  border: none;
  font-size: 17px;
  padding: 7px 13px;
  border-radius: 3px;
  text-decoration: none;
  text-transform: uppercase;
  cursor: pointer;
  :hover {
    background-color: hsla(255, 100%, 25%, 0.1);
    transition: 1.1s;
  }
`;
const StyledNavLinkDropDown=styled(NavLink)`
background-color: none;
:active{
background: #000000;
background: -webkit-linear-gradient(to right, #434343, #000000);
background: linear-gradient(to right, #434343, #000000);
}
&.active {
background: #000000;
background: -webkit-linear-gradient(to right, #434343, #000000);
background: linear-gradient(to right, #434343, #000000); }
`;
const StyledDivRow=styled.div`
    flex-wrap: initial;
    margin: revert;
`;

export const Navigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuthentication();
  const [show, setShow] = useState(false);
  const history = useHistory();
  const [item, setItem] = useState(null);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
    if (isAuthenticated) {
      setItem(
        JSON.parse(localStorage.getItem('cloud_users'))
      );
    }
  }, [isAuthenticated]);
  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  };
  const handleShow =  () => {
    setShow(false);
    dispatch(logout());
    history.push('/login');
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark  navbar-dark">
      <div className="container">
        <button
          className="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse bg-dark`} id="navbar">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-brand">
              <NavLink exact to="/" className="nav-link"
                       onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                Ürünler
              </NavLink>
            </li>
            <li className="navbar-brand">
              <NavLink exact to="/vitrin" className="nav-link"
                       onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                Vitrin
              </NavLink>
            </li>
            {item?.roles?.[0]==="ROLE_CUSTOMER"?(
              <>
                <li className="navbar-brand">
                  {isAuthenticated?(
                    <NavLink  to="/seller" className="nav-link"
                              onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                      Satıcı Ol
                    </NavLink>
                  ):(null)}
                </li>
                <li className="navbar-brand">
                  {isAuthenticated?(
                    <NavLink  to="/sepet" className="nav-link"
                              onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                      <MdLocalGroceryStore size={'30px'}/>
                    </NavLink>
                  ):(null)}
                </li>
              </>
            ):(null)}
            {item?.roles?.[0]==="ROLE_SELLER"?(
              <>
                <li className="navbar-brand">
                  {isAuthenticated?(
                    <NavLink  to="/addProduct" className="nav-link"
                              onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                      Ürün Ekle
                    </NavLink>
                  ):(null)}
                </li>

                <li className="navbar-brand">
                  {isAuthenticated?(
                    <NavLink  to="/siparisler" className="nav-link"
                              onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                      Siparişler
                    </NavLink>
                  ):(null)}
                </li>

                <li className="navbar-brand">
                  {isAuthenticated?(
                    <NavLink  to="/sepet" className="nav-link"
                              onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                      <MdLocalGroceryStore size={'30px'}/>
                    </NavLink>
                  ):(null)}
                </li>
              </>
            ):(null)}
            {item?.roles?.[0]==="ROLE_ADMIN"?(
              <>
                <li className="navbar-brand">
                  {isAuthenticated?(
                    <NavLink  to="/sellerDetail" className="nav-link"
                              onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                      Başvurular
                    </NavLink>
                  ):(null)}
                </li>
                <li className="navbar-brand">
                  {isAuthenticated?(
                    <NavLink  to="/productDetail" className="nav-link"
                              onClick={() => dispatch({ type: '@temp/ERROR_REQUIRED', payload: null })}>
                      Yeni Eklenen Ürünler
                    </NavLink>
                  ):(null)}
                </li>
              </>
            ):(null)}
            <li className="justify-content-md-center">
              {/* <Search />*/}
            </li>
            <li>
              {isAuthenticated ? (
                <NavDropdown className="nav-link" title={<>
                  <FaUser size={'30px'}/></>} id="basic-nav-dropdown">
                  <p className="mb-lg-n3 my-sm-n2 text-black-50 text-center">Hesap İşlemleri</p>
                  <hr/>
                  <StyledDivRow className="row my-sm-n2">
                      <NavLink
                        className="dropdown-item"
                        to={'/profile'}
                        type="button"
                        onClick={() => {
                          dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                          dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                        }}
                      >
                        <RiUser3Line/>
                      </NavLink>
                    <NavDropdown.Item type="button" to="/" onClick={handleOpen}>
                      <MdPowerSettingsNew/>
                    </NavDropdown.Item>


                  </StyledDivRow>
                  <Popup show={show} onHide={handleClose}>
                    Sistemden Çıkıyorsunuz Emin misiniz?
                    <PopupButton variant="secondary" onClick={handleClose}>
                      HAYIR
                    </PopupButton>
                    <PopupButton type="submit" variant="primary" onClick={handleShow}>
                      EVET
                    </PopupButton>
                  </Popup>
                </NavDropdown>
              ) : (
                <StyledDropNavHeader className="nav-link" title={<FaUser size={'40px'} />} id="basic-nav-dropdown">
                  <StyledNavLinkDropDown
                    className="dropdown-item"
                    to="/register"
                    onClick={() => {
                      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                    }}
                  >
                    Kayıt Ol
                  </StyledNavLinkDropDown>
                  <StyledNavLinkDropDown
                    className="dropdown-item"
                    to="/login"
                    onClick={() => {
                      dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
                      dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
                    }}
                  >
                    Giriş
                  </StyledNavLinkDropDown>
                </StyledDropNavHeader>

              )}
            </li>
          </ul>
        </div>
      </div>
        </nav>
  );
};
