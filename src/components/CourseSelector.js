import { useEffect, useState } from "react";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const config = require('../utils/config');

export default function CourseSelector() {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [validated, setValidated] = useState(false);
    const [courseID, setCourseID] = useState();
    const navigate = useNavigate();

    //TO BE IMPLEMENTED: term selector
    const reqUrl = `${config.API_URL}/courses/me?term=2021-2022-1`;
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
                setCourses(res.data.data);
            })
            .catch((error) => {
                console.log("error " + JSON.stringify(error.response));
            });
      }, [reqUrl, token, setIsLoading, setCourses]);

     function handleSubmit(e) {
        navigate(`/courses/${courseID}/new-review`);
    }
    function handleSelect(e) {
        console.log("e.target.value", e.target.value);
        setCourseID(e.target.value);
        setValidated(true);
    }
  
    return (
        <Container className="p-3 border rounded-3">
            <h1>Select a course to review</h1>
            <Form id='courseSelector' onSubmit={handleSubmit} >
                <Form.Select onChange={handleSelect} disabled={isLoading}>
                    <option key="default" value="" hidden>select a course...</option>
                    {
                        courses.map(course => 
                            <option key={course.bsid} value={course.bsid}>({course.course.code}) {course.course.name}</option>
                        )
                    }
                </Form.Select>
                <button type='submit' className='btn btn-primary' disabled={!validated}>
						Submit
				</button>
            </Form>
        </Container>
    );
  };