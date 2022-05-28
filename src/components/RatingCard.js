import { useState } from "react";
import { ListGroup,Container, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";

const config = require('../utils/config');

export default function RatingCard({rating, title, isUser}) {
    const [showModal, setShowModal] = useState(false);

    function handleClickEdit() {

    }
    function handleClickDelete() {
        setShowModal(true);
    }

    return (
        <ListGroup.Item>
            <Link
                to={`/courses/${rating.courseId}`}
            >{title}</Link>
            <ListGroup horizontal>
                <ListGroup.Item>Overall: {rating.overall} / 5</ListGroup.Item>
                <ListGroup.Item>Workload: {rating.workload} / 5</ListGroup.Item>
                <ListGroup.Item>Easiness: {rating.easiness} / 5</ListGroup.Item>
                <ListGroup.Item>Usefulness: {rating.usefulness} / 5</ListGroup.Item>
                <ListGroup.Item>Likes: {rating.upvotes - rating.downvotes}</ListGroup.Item>
                <ListGroup.Item>Comments: {rating.commentCount}</ListGroup.Item>
            </ListGroup>
            <Card>
                <Card.Body>
                <div>Advice:</div>
                <div style={{"whiteSpace": "pre-line"}}>{rating.advice}</div>
                </Card.Body>
            </Card>
            {isUser && (
                <div>
                    <DeleteModal 
                    show={showModal} 
                    setShow={setShowModal} 
                    ratingId={rating._id} 
                    redirectUrl={"/user"}
                    />
                    <Button onClick={handleClickEdit}>
                        Edit
                    </Button>
                    <Button  onClick={handleClickDelete}>
                        Delete
                    </Button>
                </div>
            )}
        </ListGroup.Item>
    )
}