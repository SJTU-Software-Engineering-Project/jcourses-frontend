import RB_Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const config = require('../utils/config');

export default function Navbar({ loggedIn }) {
  const loginUrl = `${config.JACCOUNT_URL}/authorize?response_type=code&scope=basic lessons classes&client_id=${config.JACCOUNT_ID}&redirect_uri=${config.CLIENT_URL}/loginRedirect`;
  const logoutUrl = `${config.JACCOUNT_URL}/logout?client_id=${config.JACCOUNT_ID}&post_logout_redirect_uri=${config.CLIENT_URL}/logOutRedirect`;

  return (
    <RB_Navbar bg="dark" variant="dark">
      <Container>
        <RB_Navbar.Brand>JCourses</RB_Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        {loggedIn ?
        <Nav>
          <Nav.Link href="/new-review">New Review</Nav.Link>
          <Nav.Link href="/user">My Reviews</Nav.Link>
          <Nav.Link href={logoutUrl}>Logout</Nav.Link> 
        </Nav>
        : 
        <Nav>
        <Nav.Link href={loginUrl}>JAccount Login</Nav.Link>
        </Nav>}
      </Container>
    </RB_Navbar>
  );
};