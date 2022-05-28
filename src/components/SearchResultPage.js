import { useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from '../utils/config';
import CourseList from "./CourseList";

export default function SearchResultPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.get("q");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/courses?q=${searchString}`);
        console.log(response.data.data)
        setCourses(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Container className="mx-auto mt-3 p-3">
      <h3>Results for "{searchString}"</h3>
      <CourseList courses={courses} isLoading={isLoading} />
    </Container>
  );
};