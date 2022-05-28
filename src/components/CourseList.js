import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
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
            <Card key={course._id}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Link
                  className="text-decoration-none"
                  to={`/courses/${course._id}`}
                >
                  {course.code}: {course.name} ({course.teacher})
                </Link>
                {Math.round(course.overall*100) / 100}
              </Card.Header>
              <Card.Body className="d-flex justify-content-between">
                <Card.Subtitle className="text-muted">
                  {course.credits} credits &nbsp;&nbsp;&nbsp; {course.organize}
                </Card.Subtitle>
                <Card.Subtitle className="text-muted">
                  {course.ratingCount} reviews
                </Card.Subtitle>
              </Card.Body>
            </Card>)
        )
      }
    </Container>
  );
};