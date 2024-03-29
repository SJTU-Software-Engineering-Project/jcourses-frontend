import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { ListGroup } from "react-bootstrap";
import RatingCard from "./RatingCard";
import {getUserVote} from "../utils/utilFunctions";

const config = require('../utils/config');

export default function UserRatingList(props) {
  return (
    <Container className="p-0">
      {
        props.isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading my reviews...</span>
          </Spinner>
        ) : (
          props.ratings.length !== 0 ? (
            <ListGroup>
              {
                props.ratings.map(rating => (
                  <RatingCard 
                    rating={rating} 
                    key={rating._id} 
                    title={config.COURSE_ID_TO_NAME[rating.courseId] || "Unknown"} 
                    isUser={true}
                    userVote={getUserVote(props.voteStatus, rating._id)}
                  />
                )) 
              }
            </ListGroup>
          ) : (
            <>
                <p>No reviews yet!</p>
                <a href='new-review'>Create one here.</a>
            </>
          )
        )
      }
    </Container>
  );
};