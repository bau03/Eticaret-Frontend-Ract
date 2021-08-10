import React from 'react';
import {   Popup} from '@internship/ui';
import { Accordion, Button, Card} from 'react-bootstrap';
import {PasswordUpdate} from "./PasswordUpdate";
import {AboutUpdate} from "./AboutUpdate";
import {AddAdress} from "./AddAdress";
import {AddPurse} from "./AddPurse";
type ContentMoreProps = {
  showProfileEdit;
  handleCloseProfileEdit;
  handleShowProfileEdit;
  setShow;
};

export const EditProfile: React.FC<ContentMoreProps> = ({ showProfileEdit,handleCloseProfileEdit,handleShowProfileEdit,setShow }) => {

  return(
    <Popup show={showProfileEdit} onHide={handleCloseProfileEdit}>
      Kullanıcı bilgilerinizi değiştirdikten sonra güncellemeyi unutmayınız !
      <Accordion defaultActiveKey="0" className="mt-2">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
              Sifre Değiştir
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <PasswordUpdate showProfileEdit={showProfileEdit} handleCloseProfileEdit={handleCloseProfileEdit} handleShowProfileEdit={handleShowProfileEdit}/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Hesap Bilgilerini Güncelle
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <AboutUpdate showProfileEdit={showProfileEdit} handleCloseProfileEdit={handleCloseProfileEdit} handleShowProfileEdit={handleShowProfileEdit}/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="2">
              Yeni Adres Ekle
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <AddAdress showProfileEdit={showProfileEdit} handleCloseProfileEdit={handleCloseProfileEdit} handleShowProfileEdit={handleShowProfileEdit}/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="3">
              Cüzdana Bakiye Ekle
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>
              <AddPurse setShow={setShow} showProfileEdit={showProfileEdit} handleCloseProfileEdit={handleCloseProfileEdit} handleShowProfileEdit={handleShowProfileEdit}/>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Popup>
  );
}
