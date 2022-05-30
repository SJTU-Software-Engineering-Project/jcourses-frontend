import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useParams, useNavigate } from "react-router-dom";
import {Card, ListGroup, Form, Spinner } from "react-bootstrap";
import DeleteModal from "./DeleteModal";
import VoteButtons from "./VoteButtons";
import { FaRegCommentAlt } from "react-icons/fa";

import { API_URL } from "../utils/config";
import {userToNickname, getUserVote} from "../utils/utilFunctions";
import CommentList from "./CommentList";
import LoginPopup from "./LoginPopup";

export default function RatingPage({loggedIn}) {
  const {courseId, ratingId} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState();
  const [rating, setRating] = useState([]);
  const [userId, setUserId] = useState();
  const [status, setStatus] = useState(0);
  const [upvotes, setUpvotes] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const navigate = useNavigate();
  const token = "Bearer " + localStorage.getItem("access_token");

  async function handleComment(e) {
    e.preventDefault();

    if (!loggedIn) {
        setShowModal2(true);
        return;
    }

    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const body = formData.get('body');

    //term to be implemented
    axios.post(`${API_URL}/comments`, {
        "ratingId": ratingId,
        "body": body,
      }, {headers: {
        authorization: token,
    }})
      .then(function (response) {
        console.log(response);
        navigate(0);
      })
      .catch(function (error) {
        console.log(error);
      });
}

  useEffect(() => {
    setIsLoading(true);
    async function fetchCourse() {
      const response = await axios.get(`${API_URL}/courses/${courseId}`);
      setCourse(response.data.data);
    }
    async function fetchCourseRatings() {
      const response = await axios.get(`${API_URL}/ratings/${ratingId}`,{headers: {authorization: token}});
      setRating(response.data.data);
      setUpvotes(response.data.data.upvotes - response.data.data.downvotes);
    }
    async function fetchUser() {
      if (loggedIn) {
        const response = await axios.get(`${API_URL}/users/me`,{headers: {authorization: token}});
        setUserId(response.data.data.id);
      } else {
        setUserId(null);
      }
    }
    async function fetchVotes() {
      if (loggedIn) {
        const response = await axios.get(`${API_URL}/votes/me`,{headers: {authorization: token}});
        setStatus(getUserVote(response.data.data),ratingId);
      } else {
        setStatus(0);
      }
    }
    Promise.all([fetchCourse(), fetchCourseRatings(),fetchUser(), fetchVotes()])
      .then(() => {
        setIsLoading(false);
      })
      .catch(error => console.log(error));
    
    }, [courseId, token, loggedIn, ratingId]);

    function handleClickDelete() {
        setShowModal(true);
    }

    function handleClickEdit() {
        const path = `/courses/${courseId}/ratings/${ratingId}/edit`;
        navigate(path);
    }

  return (
    <Container className="mt-3 p-0">
      {
        isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container className="p-0 d-flex justify-content-between align-items-start">
            
            <Card className="me-3" style={{width: '30%'}}>
              <Card.Header>
                <h3>Course Info</h3>
              </Card.Header>
              {/* <Card.Body> */}
                
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Course Code: {course.code}</ListGroup.Item>
                  <ListGroup.Item>Course Name: {course.name}</ListGroup.Item>
                  <ListGroup.Item>Teacher: {course.teacher}</ListGroup.Item>
                  <ListGroup.Item>Credits: {course.credits}</ListGroup.Item>
                </ListGroup>
              {/* </Card.Body> */}
            </Card>

            <Card style={{width: '70%'}}>
              <Card.Header className="d-flex justify-content-between">
                <h3>{course.name} review by {rating.userId === userId ? 
                    "Me" : userToNickname(rating.userId)}</h3>
                {
                  loggedIn && (rating.userId === userId) && (
                      <div className="pull-right">
                        <Button
                        variant="primary"
                        onClick={handleClickEdit}  
                        > Edit </Button> {""}
                        <Button
                        variant="primary"
                        onClick={handleClickDelete}
                        > Delete </Button> 
                        <DeleteModal 
                        show={showModal} 
                        setShow={setShowModal} 
                        ratingId={rating._id} 
                        redirectUrl={"/user"}
                        />
                      </div>
                  )
                }
              </Card.Header>
              <Card.Body>
                <ListGroup horizontal>
                    <ListGroup.Item>Overall: {rating.overall} / 5</ListGroup.Item>
                    <ListGroup.Item>Workload: {rating.workload} / 5</ListGroup.Item>
                    <ListGroup.Item>Easiness: {rating.easiness} / 5</ListGroup.Item>
                    <ListGroup.Item>Usefulness: {rating.usefulness} / 5</ListGroup.Item>
                </ListGroup>
                <Card>
                    <Card.Body>
                    <div>Advice:</div>
                    <div style={{"whiteSpace": "pre-line"}}>{rating.advice}</div>
                    </Card.Body>
                </Card>
                <VoteButtons 
                    status={status}
                    setStatus={setStatus}
                    upvotes={upvotes}
                    setUpvotes={setUpvotes}
                    ratingId={rating._id}
                />
                <label className="p-2"><FaRegCommentAlt /> {rating.commentCount} Comments</label>
                <Form onSubmit={handleComment} className="py-2">
                    <Card>
                        <Card.Header>Comment:</Card.Header>
                        <Form.Control
                            as="textarea" rows={3}
                            name = "body"
                            placeholder='Any thoughts?'
                        />
                        <Card.Footer>
                            <Button type='submit' className='btn btn-secondary btn-sm float-sm-end'>
                                Comment
                            </Button>
                        </Card.Footer>
                        <LoginPopup
                        setShow={setShowModal2}
                        show={showModal2}
                        />
                    </Card>
                </Form>
                <h5>Comments</h5>
                <CommentList
                    ratingId={ratingId}
                    userId={userId}
                    token={token}
                />
              </Card.Body>
            </Card>
            
          </Container>
        )
      }
    </Container>
  );
};