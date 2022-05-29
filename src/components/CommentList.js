import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/config";
import {userToNickname} from "../utils/utilFunctions";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CommentList({ratingId, userId, token}) {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${API_URL}/ratings/${ratingId}/comments`,{headers: {authorization: token}})
            .then((res) => {
                setComments(res.data.data);
                setIsLoading(false);
                console.log(res.data.data);
            })
            .catch(error => console.log(error));
    }, [ratingId, token]);

    async function handleDelete(id) {
        console.log(id);
        axios.delete(`${API_URL}/comments/${id}`,{headers: {authorization: token}})
            .then((res) => {
                console.log(res);
                navigate(0);
            })
            .catch(error => console.log(error));
    }

    return (
        <>
        {
            isLoading ? (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            ) : (
            comments.map((comment,i) => 
                <Card key={comment._id}>
                <Card.Header className="d-flex justify-content-between">
                    #{i+1}{" "}{userId === comment.userId ? "Me" : userToNickname(comment.userId)}:
                    {userId === comment.userId && <FaRegTrashAlt onClick={() => {handleDelete(comment._id)}} />}
                </Card.Header>
                <Card.Body className="d-flex justify-content-between">
                    {comment.body}
                </Card.Body>
                </Card>)
            )
        }
        </>
    );
};