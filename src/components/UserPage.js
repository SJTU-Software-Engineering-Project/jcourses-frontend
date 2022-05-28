import { useEffect, useState } from "react";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import UserRatingList from "./UserRatingList";

const config = require('../utils/config');

export default function UserPage() {
    const [ratings, setRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const reqUrl = `${config.API_URL}/ratings/me`;
    const token = "Bearer " + localStorage.getItem("access_token");
    console.log("Token ", token);

    useEffect(() => {
        axios
            .get(reqUrl, {
                headers: {
                    authorization: token,
                }
            })
            .then((res) => {
                console.log(res.data);
                console.log(res.data.data);
                setIsLoading(false);
                setRatings(res.data.data);
            })
            .catch((error) => {
                console.log("error " + JSON.stringify(error.response));
            });
      }, [reqUrl, token, setIsLoading, setRatings]);
  
    return (
        <Container className="p-3 border rounded-3">
        <h1>My Reviews</h1>
        <UserRatingList isLoading={isLoading} ratings={ratings} />
      </Container>
    );
  };