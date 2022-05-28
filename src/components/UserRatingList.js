import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { ListGroup } from "react-bootstrap";
import RatingCard from "./RatingCard";

const config = require('../utils/config');

export default function UserRatingList(props) {
  return (
    <Container className="p-3 border rounded-3">
      {
        props.isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : 
        ( props.ratings.length !== 0 ?
            (
              <ListGroup>
              {
                props.ratings.map(rating => (
                  <RatingCard 
                  rating={rating} 
                  key={rating._id} 
                  title={config.COURSE_ID_TO_NAME[rating.courseId] || "Unkown"} 
                  isUser={true}
                  />
                )) 
              }
              </ListGroup>
            ) :
            (
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