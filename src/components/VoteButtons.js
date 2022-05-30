import axios from 'axios';
import { useEffect, useState } from "react";
import { Container } from 'react-bootstrap';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import { API_URL } from "../utils/config";

export default function VoteButtons (props) {
    const token = "Bearer " + localStorage.getItem("access_token");
    const postReqUrl = `${API_URL}/votes`;

	async function handleUpvote() {
		let score;
		if (props.status === 1) {
			// already liked the post
			score = 0;            
		} else {
			score = 1;
		}
        const res = await axios.post(postReqUrl, {
            "ratingId":props.ratingId, 
            "score":score
        }, {headers: {
            authorization: token,
        }})
        console.log(res);
		if (res.status === 200) {
			if (props.status === -1) {
				// already disliked, increase upvotes by 2
				props.setUpvotes(props.upvotes + 2);
				props.setStatus(1);
			} else if (props.status !== 1) {
				props.setUpvotes(props.upvotes + 1);
				props.setStatus(1);
			} else {
				props.setUpvotes(props.upvotes - 1);
				props.setStatus(0);
			}
		}
	}

	async function handleDownvote() {
		let score;
		if (props.status === 1) {
			// already disliked the post
			score = 0;            
		} else {
			score = -1
		}
        const res = await axios.post(postReqUrl, {
            "ratingId":props.ratingId, 
            "score":score
        }, {headers: {
            authorization: token,
        }})
        console.log(res);
		if (res.status === 200) {
			if (props.status === 1) {
				// already liked, decrease upvotes by 2
				props.setUpvotes(props.upvotes - 2);
				props.setStatus(-1);
			} else if (props.status !== -1) {
				props.setUpvotes(props.upvotes - 1);
				props.setStatus(-1);
			} else {
				props.setUpvotes(props.upvotes + 1);
				props.setStatus(0);
			}
		}
	}
	return (
		<label >
			<button onClick={handleUpvote} >
				{props.status === 1 ? <AiFillLike /> : <AiOutlineLike />}
			</button>
            <label className='font-weight-bold mx-0'>{props.upvotes}</label>
			<button	onClick={handleDownvote} >
				{props.status === -1 ? <AiFillDislike /> : <AiOutlineDislike />}
			</button>
		</label>
	);
};

