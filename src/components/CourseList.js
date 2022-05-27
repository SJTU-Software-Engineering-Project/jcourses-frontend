import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

export default function CourseList(props) {
  return (
    <Container className="p-3 border rounded-3">
      {
        props.isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          props.courses.map(course => 
            <Card className="p-3" key={course._id}>
              <Card.Title>
                <Link
                  className="text-decoration-none"
                  to={`/courses/${course._id}`}
                >
                  {course.code}: {course.name} ({course.teacher})
                </Link>
              </Card.Title>
              <Card.Body>
                Credits: {course.credits}
                <ListGroup horizontal>
                  <ListGroup.Item>Overall: {course.overall}</ListGroup.Item>
                  <ListGroup.Item>Workload: {course.workload}</ListGroup.Item>
                  <ListGroup.Item>Easiness: {course.easiness}</ListGroup.Item>
                  <ListGroup.Item>Usefulness: {course.userfulness}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>)
        )
      }
    </Container>
  );
};