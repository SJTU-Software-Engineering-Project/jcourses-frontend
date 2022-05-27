import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

export default function RatingList(props) {
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
            props.ratings.map(rating => 
                <Card key={rating._id}>
                <Card.Body>
                    ttt
                </Card.Body>
                </Card>)
            ) :
            (
                <>
                    <p>No reviews yet!</p>
                    {props.parent === 'user' && <a href='new-review'>Create one here.</a>}
                </>
            )
        )
      }
    </Container>
  );
};