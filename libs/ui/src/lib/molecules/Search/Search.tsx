import React from 'react';
import { Form, FormControl } from 'react-bootstrap';
import { Button } from "../../atoms/Button";


export const Search = () => {
  return (
    <Form inline className="mr-sm-4">
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="info">Search</Button>
    </Form>
  );
};
