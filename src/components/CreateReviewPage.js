//TO BE IMPLEMENTED: term selector

import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import StarRating from './StarRating';

const config = require('../utils/config');

export default function CreateReviewPage() {
	const [isLoading, setIsLoading] = useState(true);
	const [course, setCourse] = useState();

	const [overallRating, setOverallRating] = useState(0);
	const [overallHover, setOverallHover] = useState(0);
	const [overallValidate, setOverallValidate] = useState(true);
	const [workloadRating, setWorkloadRating] = useState(0);
	const [workloadHover, setWorkloadHover] = useState(0);
	const [workloadValidate, setWorkloadValidate] = useState(true);
	const [easinessRating, setEasinessRating] = useState(0);
	const [easinessHover, setEasinessHover] = useState(0);
	const [easinessValidate, setEasinessValidate] = useState(true);
	const [usefulnessRating, setUsefulnessRating] = useState(0);
	const [usefulnessHover, setUsefulnessHover] = useState(0);
	const [usefulnessValidate, setUsefulnessValidate] = useState(true);

	const {courseId} = useParams();
	const navigate = useNavigate();
	const reqUrl = `${config.API_URL}/courses/${courseId}`;
	const postReqUrl = `${config.API_URL}/ratings`;
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
				setCourse(res.data.data)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log("error " + JSON.stringify(error.response));
            });
      }, [reqUrl, token, setIsLoading]);

	async function handleSubmit(e) {
		e.preventDefault();
		const formElement = e.currentTarget;
		const formData = new FormData(formElement);
		const body = formData.get('body');

		var flag = false;
		if (overallRating === 0) {
			setOverallValidate(false);
			flag = true;
		}
		if (workloadRating === 0) {
			setWorkloadValidate(false);
			flag = true;
		}
		if (easinessRating === 0) {
			setUsefulnessValidate(false);
			flag = true;
		}
		if (usefulnessRating === 0) {
			setUsefulnessValidate(false);
			flag = true;
		}
		if (flag) {
			return;
		}
		
		//term to be implemented
		axios.post(postReqUrl, {
			"term": "2021-2022-1",
			"courseId": courseId,
			"overall": overallRating,
			"workload": workloadRating,
			"easiness": easinessRating,
			"usefulness": usefulnessRating,
			"advice": body,
			
		  }, {headers: {
			authorization: token,
		}})
		  .then(function (response) {
			console.log(response);
			navigate(`/courses/${courseId}`);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}
	return (
		<Container className="p-3 border rounded-3">
				<h1>New Review</h1>
				<Form onSubmit={handleSubmit}>
					
					<div>
						<h5>Course Name</h5>
						<label>{isLoading ? " " : course.name}</label>
					</div>
					<div>
						<h5>Course Code</h5>
						<label>{isLoading ? " " : course.code}</label>
					</div>
					<div>
						<h5>Instructor</h5>
						<label>{isLoading ? " " : course.teacher}</label>
					</div>
					<div>
						<h5>Organization</h5>
						<label>{isLoading ? " " : course.organize}</label>
					</div>
					<div>
						<h5>Overall Rating</h5>
						<StarRating 
						rating={overallRating} 
						setRating={setOverallRating}
						hover={overallHover}
						setHover={setOverallHover}
						validate={overallValidate}
						setValidate={setOverallValidate}
						/>
					</div>
					<div>
						<h5>How is the course's workload?</h5>
						<StarRating 
						rating={workloadRating} 
						setRating={setWorkloadRating}
						hover={workloadHover}
						setHover={setWorkloadHover}
						validate={workloadValidate}
						setValidate={setWorkloadValidate}
						/>
					</div>
					<div>
						<h5>How difficult is the course? (1 - hard, 5 - easy)</h5>
						<StarRating 
						rating={easinessRating} 
						setRating={setEasinessRating}
						hover={easinessHover}
						setHover={setEasinessHover}
						validate={easinessValidate}
						setValidate={setEasinessValidate}
						/>
					</div>
					<div>
						<h5>How useful is the course?</h5>
						<StarRating 
						rating={usefulnessRating} 
						setRating={setUsefulnessRating}
						hover={usefulnessHover}
						setHover={setUsefulnessHover}
						validate={usefulnessValidate}
						setValidate={setUsefulnessValidate}
						/>
					</div>
					
					
					<div>
						<h5>Comments on the course</h5>
						<Form.Control
							as="textarea" rows={5}
							name = "body"
							placeholder='Enter text'
						/>
					</div>
					
					<button type='submit' className='btn btn-primary'>
						Submit
					</button>
				</Form>
		</Container>
	);
};