//TO BE IMPLEMENTED: term selector

import React, { useState, useEffect } from 'react';
import { Form, Container, Spinner, Card, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import StarRating from './StarRating';

const config = require('../utils/config');

export default function EditReviewPage() {
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
	const [advice, setAdvice] = useState("");


	const {courseId, ratingId} = useParams();
	const navigate = useNavigate();
	const reqUrl = `${config.API_URL}/courses/${courseId}`;
	const reqUrl2 = `${config.API_URL}/ratings/${ratingId}`;
	const postReqUrl = `${config.API_URL}/ratings/${ratingId}`;
    const token = "Bearer " + localStorage.getItem("access_token");

	useEffect(() => {
        setIsLoading(true);

		async function fetchCourse() {
			const response = await axios.get(reqUrl);
			setCourse(response.data.data);
			
		}
		async function fetchRating() {
			const response = await axios.get(reqUrl2,{headers: {
				authorization: token,
			}});
			const d = response.data.data;
			setOverallRating(d.overall);
			setUsefulnessRating(d.usefulness);
			setEasinessRating(d.easiness);
			setWorkloadRating(d.workload);
			setAdvice(d.advice);
		}
		Promise.all([fetchCourse(),fetchRating()])
			.then(() => {
				console.log("xxx");
				setIsLoading(false);
			})
			.catch(error => console.log(error));
      }, [reqUrl,reqUrl2, token]);

	async function handleSubmit(e) {
		e.preventDefault();
		const formElement = e.currentTarget;
		const formData = new FormData(formElement);
		const body = formData.get('body');
		
		//term to be implemented
		axios.put(postReqUrl, {
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
			navigate(`/courses/${courseId}/ratings/${ratingId}`);
		  })
		  .catch(function (error) {
			console.log(error);
		  });
	}
	return (
    <Container className="mt-3 p-3">
      {
        isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Container className="p-0 d-flex justify-content-between align-items-start">
            
            <Card className="me-5" style={{width: '30%'}}>
              <Card.Header>
                <h3>Course Info</h3>
              </Card.Header>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item>Course Code: {course.code}</ListGroup.Item>
                  <ListGroup.Item>Course Name: {course.name}</ListGroup.Item>
                  <ListGroup.Item>Teacher: {course.teacher}</ListGroup.Item>
                  <ListGroup.Item>Credits: {course.credits}</ListGroup.Item>
                </ListGroup>
            </Card>

            <Form style={{width: '70%'}} onSubmit={handleSubmit}>
              <Card>
                <Card.Header><h3>Edit Review</h3></Card.Header>
                <Card.Body>
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
                  
                  <button type='submit' className='mt-3 btn btn-primary'>
                    Submit
                  </button>
                </Card.Body>
              </Card>
            </Form>
          </Container>
        )
      }
    </Container>
		// <Container className="p-3 border rounded-3">
		// 		<h1>Edit Review</h1>
		// 		<Form onSubmit={handleSubmit}>
					
		// 			<div>
		// 				<h5>Course Name</h5>
		// 				<label>{isLoading ? " " : course.name}</label>
		// 			</div>
		// 			<div>
		// 				<h5>Course Code</h5>
		// 				<label>{isLoading ? " " : course.code}</label>
		// 			</div>
		// 			<div>
		// 				<h5>Instructor</h5>
		// 				<label>{isLoading ? " " : course.teacher}</label>
		// 			</div>
		// 			<div>
		// 				<h5>Organization</h5>
		// 				<label>{isLoading ? " " : course.organize}</label>
		// 			</div>
		// 			<div>
		// 				<h5>Overall Rating</h5>
		// 				<StarRating 
		// 				rating={overallRating} 
		// 				setRating={setOverallRating}
		// 				hover={overallHover}
		// 				setHover={setOverallHover}
		// 				validate={overallValidate}
		// 				setValidate={setOverallValidate}
		// 				/>
		// 			</div>
		// 			<div>
		// 				<h5>How is the course's workload?</h5>
		// 				<StarRating 
		// 				rating={workloadRating} 
		// 				setRating={setWorkloadRating}
		// 				hover={workloadHover}
		// 				setHover={setWorkloadHover}
		// 				validate={workloadValidate}
		// 				setValidate={setWorkloadValidate}
		// 				/>
		// 			</div>
		// 			<div>
		// 				<h5>How difficult is the course? (1 - hard, 5 - easy)</h5>
		// 				<StarRating 
		// 				rating={easinessRating} 
		// 				setRating={setEasinessRating}
		// 				hover={easinessHover}
		// 				setHover={setEasinessHover}
		// 				validate={easinessValidate}
		// 				setValidate={setEasinessValidate}
		// 				/>
		// 			</div>
		// 			<div>
		// 				<h5>How useful is the course?</h5>
		// 				<StarRating 
		// 				rating={usefulnessRating} 
		// 				setRating={setUsefulnessRating}
		// 				hover={usefulnessHover}
		// 				setHover={setUsefulnessHover}
		// 				validate={usefulnessValidate}
		// 				setValidate={setUsefulnessValidate}
		// 				/>
		// 			</div>
					
					
		// 			<div>
		// 				<h5>Comments on the course</h5>
		// 				<Form.Control
		// 					as="textarea" rows={5}
		// 					name = "body"
		// 					placeholder='Enter text'
		// 					defaultValue={advice}
		// 				/>
		// 			</div>
					
		// 			<button type='submit' className='btn btn-primary'>
		// 				Submit
		// 			</button>
		// 		</Form>
		// </Container>
	);
};