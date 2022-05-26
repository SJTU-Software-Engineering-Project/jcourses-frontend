import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";

import Navbar from "./Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Container className="py-3">
        <p>
          JCourses is a web app for SJTU undergrads to search for and review courses. It is our group project for EE458: Software Engineering.
        </p>
        <h1>Team Members</h1>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Ian Chong</Accordion.Header>
            <Accordion.Body>Ian</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Futao Wei</Accordion.Header>
            <Accordion.Body>Futao</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Xiwen Teoh</Accordion.Header>
            <Accordion.Body>Xiwen</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Xihan Li</Accordion.Header>
            <Accordion.Body>Xihan</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};