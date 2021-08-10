import { Card, Col, Collapse, Container, Form, Row } from 'react-bootstrap';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { updateAsync } from '@internship/store/authentication';
import { useDispatch } from 'react-redux';
import { Button } from '../../atoms/Button';

export const UserForm = ({ ...props }) => {
  const { handleSubmit, register } = useForm();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    dispatch(updateAsync.request(values));
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group as={Row} controlId="username">
        <Form.Label column sm={2}>
          Username
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="username" placeholder="Username" readOnly />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="email">
        <Form.Label column sm={2}>
          Email
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="email" type="email" placeholder="Email" ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="name">
        <Form.Label column sm={2}>
          Name
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="name" placeholder="Name" ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="lastname">
        <Form.Label column sm={2}>
          Last Name
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="lastname" placeholder="Last Name" ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="age">
        <Form.Label column sm={2}>
          Age
        </Form.Label>
        <Col sm={2}>
          <Form.Control name="age" placeholder="Age" ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="phoneNumber">
        <Form.Label column sm={2}>
          Phone Number
        </Form.Label>
        <Col sm={4}>
          <Form.Control name="phoneNumber" placeholder="Phone Number" ref={register({ required: false })} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="bio">
        <Form.Label column sm={2}>
          Bio
        </Form.Label>
        <Col sm={8}>
          <Form.Control name="bio" as="textarea" rows={5} ref={register({ required: false })} />
        </Col>
      </Form.Group>

      <Container fluid>
        <Button onClick={() => setOpen(!open)} aria-controls="collapse" aria-expanded={open}>
          Change Password
        </Button>
        <Collapse in={open}>
          <div id="collapse">
            <Card>
              <Form.Group as={Row} controlId="password">
                <Col sm="10">
                  <Form.Control name="password" type="password" placeholder="New Password" ref={register({ required: false })} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="confirmPassword">
                <Col sm="10">
                  <Form.Control name="confirmPassword" type="password" placeholder="Confirm Password" />
                </Col>
              </Form.Group>
            </Card>
          </div>
        </Collapse>
      </Container>
      <Row className="justify-content-end">
        <Button type="submit">Update</Button>
      </Row>
    </Form>
  );
};
