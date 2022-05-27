import { useState } from "react";
import Container from "react-bootstrap/Container";

import CourseList from "./CourseList";
import Filter from "./Filter";

export default function Homepage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Container className="m-3 p-3">
      <Filter setCourses={setCourses} setIsLoading={setIsLoading} />
      <CourseList courses={courses} isLoading={isLoading} />
    </Container>
  );
};