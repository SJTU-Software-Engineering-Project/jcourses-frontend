import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";
import RatingCard from "./RatingCard";

import { API_URL } from "../utils/config";
import userToNickname from "../utils/utilFunctions";

export default function CoursePage({loggedIn}) {
  const {courseId} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState();
  const [ratings, setRatings] = useState([]);
  const [userId, setUserId] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const token = "Bearer " + localStorage.getItem("access_token");

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
    async function fetchUser() {
      if (loggedIn) {
        const response = await axios.get(`${API_URL}/users/me`,{headers: {authorization: token}});
        setUserId(response.data.data.id);
      } else {
        setUserId(null);
      }
    }
    Promise.all([fetchCourse(), fetchCourseRatings(),fetchUser()])
      .then(() => setIsLoading(false))
      .catch(error => console.log(error));
    
  }, [courseId, token]);

  function handleClickButton() {
    const path = location.pathname + '/new-review';
    navigate(path);
  }

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
            
            {
              loggedIn && (
                <Button variant="primary" onClick={handleClickButton} className="pull-right"
                  style={{"marginLeft": "100px"}}                
                >
                  {ratings.findIndex(rating => (rating.userId === userId)) !== -1 ? 
                  "Edit Review for this Course" : "Write Review for this Course" }
                </Button>
              )
            }
            </ListGroup>
            
            <h2>Ratings</h2>
            { ratings.length === 0 ? (<div>No ratings for this course</div>) :
              (
              <ListGroup>
              {
                ratings.map(rating => (
                  <RatingCard 
                  rating={rating} 
                  key={rating._id} 
                  title={userId===rating.userId ? "Me" : userToNickname(rating.userId)}
                  isUser={userId===rating.userId}
                  />
                ))
              }
              </ListGroup>
              )
            }
            
          </>
        )
      }
    </Container>
  );
};