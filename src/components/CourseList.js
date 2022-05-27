import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function CourseList(props) {
  return (
    <>
      <Container className="p-3 border rounded-3">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Card>
          <Card.Body>
            EE458: Software Engineering
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            CS3302: Database
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};