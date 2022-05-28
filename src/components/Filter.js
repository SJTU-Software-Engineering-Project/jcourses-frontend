import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CLIENT_URL } from "../utils/config";

export default function Filter() {
  const searchString = React.createRef();
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const query = searchString.current.value;
    navigate(`/search?q=${query}`);
  };
  return (
    <Container className='p-3 mb-3 d-flex align-items-center justify-content-center border rounded-3' style={{height: '450px', backgroundImage: `url('${CLIENT_URL}/assets/lake.jpeg')`, backgroundSize: '100% 100%'}}>
      <Form className='d-flex flex-row w-75' onSubmit={handleSubmit}>
        <Form.Control
          ref={searchString}
          placeholder="course code, course name, or teacher name"
        />
        
        <Button className='mx-3' type='submit'>
          Search
        </Button>
      </Form>
    </Container>
  );
};