import { useState } from "react";
import { ListGroup,Dropdown, Card, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaRegCommentAlt } from "react-icons/fa";
import VoteButtons from "./VoteButtons";

const config = require('../utils/config');

export default function RatingCard({rating, title, isUser, userVote=0, loggedIn=false}) {
    const [showModal, setShowModal] = useState(false);
    const [upvotes, setUpvotes] = useState(rating.upvotes - rating.downvotes);
    const [status, setStatus] = useState(userVote);
    const navigate = useNavigate();

    function handleClickEdit() {
        navigate(`/courses/${rating.courseId}/ratings/${rating._id}/edit`);
    }
    function handleClickDelete() {
        setShowModal(true);
    }

    return (
        <ListGroup.Item>
            <Link
                to={`/courses/${rating.courseId}/ratings/${rating._id}`}
                className="h5 text-decoration-none"
            >{title}</Link>
            <ListGroup className="mt-2" horizontal>
                <ListGroup.Item>Overall: {rating.overall} / 5</ListGroup.Item>
                <ListGroup.Item>Workload: {rating.workload} / 5</ListGroup.Item>
                <ListGroup.Item>Easiness: {rating.easiness} / 5</ListGroup.Item>
                <ListGroup.Item>Usefulness: {rating.usefulness} / 5</ListGroup.Item>
            </ListGroup>
            <Card className="mt-2">
                <Card.Body>
                <div>Advice:</div>
                <div style={{"whiteSpace": "pre-line"}}>{rating.advice}</div>
                </Card.Body>
            </Card>
            <Container className="p-2">
            <VoteButtons 
                status={status}
                setStatus={setStatus}
                upvotes={upvotes}
                setUpvotes={setUpvotes}
                ratingId={rating._id}
            />
            <label className="px-3"><FaRegCommentAlt /> {rating.commentCount} Comments</label>
            </Container>
            
            {/* {isUser && (
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
            )} */}
        </ListGroup.Item>
    )
}