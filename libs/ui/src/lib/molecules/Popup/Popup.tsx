import React from 'react';
import { Modal } from 'react-bootstrap';

export const Popup = ({ children, ...props }) => {
  const { show, handleClose } = props;
  return (
    <Modal show={show} onHide={handleClose} {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{children}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};
