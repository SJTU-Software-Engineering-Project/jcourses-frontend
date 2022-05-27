import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

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
              <Card.Body>
                {course.code} {course.name} instructed by {course.teacher}
              </Card.Body>
            </Card>)
        )
      }
    </Container>
  );
};