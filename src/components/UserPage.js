import { useEffect, useState } from "react";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import UserRatingList from "./UserRatingList";

const config = require('../utils/config');

export default function UserPage() {
    const [ratings, setRatings] = useState([]);
    const [voteStatus, setVoteStatus] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const reqUrl = `${config.API_URL}/ratings/me`;
    const reqUrl2 = `${config.API_URL}/votes/me`;
    const token = "Bearer " + localStorage.getItem("access_token");

    useEffect(() => {
        axios
            .get(reqUrl, {
                headers: {
                    authorization: token,
                }
            })
            .then((res) => {
                console.log(res.data.data);
                setRatings(res.data.data);
            })
            .catch((error) => {
                console.log("error " + JSON.stringify(error.response));
            });
        axios
            .get(reqUrl2, {
                headers: {
                    authorization: token,
                }
            })
            .then((res) => {
                console.log(res.data.data);
                setIsLoading(false);
                setVoteStatus(res.data.data);
            })
            .catch((error) => {
                console.log("error " + JSON.stringify(error.response));
            });
      }, [reqUrl, reqUrl2, token]);
  
    return (
        <Container className="p-3 border rounded-3">
        <h1>My Reviews</h1>
        <UserRatingList isLoading={isLoading} ratings={ratings} voteStatus={voteStatus} />
      </Container>
    );
  };