import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Filter() {
  const searchString = React.createRef();
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();
    const query = searchString.current.value;
    navigate(`/search?q=${query}`);
  };
  
  return (
    <Form className='d-flex flex-row' onSubmit={handleSubmit}>
      <Form.Control
        ref={searchString}
        placeholder="course code, course name, or teacher name"
      />
      
      <Button className='mx-3' type='submit'>
        Search
      </Button>
    </Form>
  );
};