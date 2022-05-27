import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";

import { API_URL } from "../utils/config";

export default function CoursePage() {
  const {courseId} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    async function fetchCourse() {
      const response = await axios.get(`${API_URL}/courses/${courseId}`);
      setCourse(response.data.data);
    }
    async function fetchCourseRatings() {
      const response = await axios.get(`${API_URL}/courses/${courseId}/ratings`);
      setRatings(response.data.data);
    }
    Promise.all([fetchCourse(), fetchCourseRatings()])
      .then(() => setIsLoading(false))
      .catch(error => console.log(error));
    
  }, [courseId]);

  return (
    <Container className="m-3 p-3">
      {
        isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <h2>Course Info</h2>
            <ListGroup horizontal>
              <ListGroup.Item>Course Code: {course.code}</ListGroup.Item>
              <ListGroup.Item>Course Name: {course.name}</ListGroup.Item>
              <ListGroup.Item>Teacher: {course.teacher}</ListGroup.Item>
            </ListGroup>
            <h2>Ratings</h2>
            <ListGroup>
              {
                ratings.map(rating => (
                  <ListGroup.Item key={rating._id}>
                    <ListGroup horizontal>
                      <ListGroup.Item>Overall: {rating.overall}</ListGroup.Item>
                      <ListGroup.Item>Workload: {rating.workload}</ListGroup.Item>
                      <ListGroup.Item>Easiness: {rating.easiness}</ListGroup.Item>
                      <ListGroup.Item>Usefulness: {rating.userfulness}</ListGroup.Item>
                    </ListGroup>
                    <p>Advice: {rating.advice}</p>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          </>
        )
      }
    </Container>
  );
};