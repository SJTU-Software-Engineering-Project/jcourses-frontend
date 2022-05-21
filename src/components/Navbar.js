import RB_Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function Navbar() {
  
  return (
    <RB_Navbar bg="dark" variant="dark">
      <Container>
        <RB_Navbar.Brand>JCourses</RB_Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="/new-review">New Review</Nav.Link>
          <Nav.Link href="/login">JAccount Login</Nav.Link>
        </Nav>
      </Container>
    </RB_Navbar>
  );
};