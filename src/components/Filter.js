import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React from 'react';

export default function Filter() {
  const courseCode = React.createRef();

  const handleSubmit = event => {
    event.preventDefault();
    console.log(courseCode.current.value);
  };
  return (
    <Container className='mx-auto my-3 p-3 border border-2 rounded-3'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3 p-1 border border-1'>
          <Form.Label>Course Code</Form.Label>
          <Form.Control ref={courseCode} placeholder="Enter course code" />
        </Form.Group>
        <Button type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};