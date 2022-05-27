import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

import { API_URL } from "../utils/config";

export default function CoursePage() {
  const {courseId} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/courses/${courseId}`);
        setCourse(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    
  }, [courseId]);

  return (
    <Container className="m-3 p-3">
      {
        isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container>
            Course Code: {course?.code}
            Course Name: {course?.name}
            Teacher: {course?.teacher}
          </Container>
        )
      }
    </Container>
  );
};