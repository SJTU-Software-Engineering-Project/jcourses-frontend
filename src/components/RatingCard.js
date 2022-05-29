import { useState } from "react";
import { ListGroup,Dropdown, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import VoteButtons from "./VoteButtons";

const config = require('../utils/config');

export default function RatingCard({rating, title, isUser, userVote=0, loggedIn=false}) {
    const [showModal, setShowModal] = useState(false);
    const [upvotes, setUpvotes] = useState(rating.upvotes - rating.downvotes);
    const [status, setStatus] = useState(userVote);
    const navigate = useNavigate();
    console.log(userVote, "xx");

    function handleClickEdit() {
        navigate(`/courses/${rating.courseId}/edit-review`);
    }
    function handleClickDelete() {
        setShowModal(true);
    }

    return (
        <ListGroup.Item>
            <Link
                to={`/ratings/${rating._id}`}
            >{title}</Link>
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
            <>Comments: {rating.commentCount}</>
            {isUser && (
                <Dropdown>
                    <DeleteModal 
                    show={showModal} 
                    setShow={setShowModal} 
                    ratingId={rating._id} 
                    redirectUrl={"/user"}
                    />
                    <Dropdown.Toggle  id="dropdown-basic">
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleClickEdit}>
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Item  onClick={handleClickDelete}>
                            Delete
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            )}
        </ListGroup.Item>
    )
}