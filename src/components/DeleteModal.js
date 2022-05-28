import {Button, Modal} from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import axios from 'axios';

import { API_URL } from "../utils/config";

export default function DeleteModal({show, setShow, ratingId, redirectUrl}) {
    const reqUrl = `${API_URL}/ratings/${ratingId}`;
    const token = "Bearer " + localStorage.getItem("access_token"); 
    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    function handleDelete() {
        axios
        .delete(reqUrl, {
            headers: {
                authorization: token,
            }
        })
        .then((res) => {
            console.log(res.data);
            console.log(res.data.data);
            setShow(false);
            navigate(redirectUrl);
            window.location.reload()
        })
        .catch((error) => {
            console.log("error " + JSON.stringify(error.response));
        });
    }
  
    return (
      <>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this review?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }