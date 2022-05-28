import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

import { API_URL } from '../utils/config';

export default function Filter(props) {
  const searchString = React.createRef();

  const handleSubmit = async event => {
    event.preventDefault();
    const query = searchString.current.value;
    props.setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/courses?q=${query}`);
      console.log(response.data.data)
      props.setCourses(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      props.setIsLoading(false);
    }
  };
  return (
    <Container className='p-3 mb-3 border rounded-3'>
      <Form className='d-flex flex-row' onSubmit={handleSubmit}>
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