import {Button, Modal} from 'react-bootstrap';

import { JACCOUNT_URL, CLIENT_URL, JACCOUNT_ID} from "../utils/config";

export default function LoginPopup({show, setShow}) {
    const loginUrl = `${JACCOUNT_URL}/authorize?response_type=code&scope=basic lessons classes&client_id=${JACCOUNT_ID}&redirect_uri=${CLIENT_URL}/loginRedirect`;

    const handleClose = () => setShow(false);

    // function handleLogin() {
    //   location.assign('https://www.javascripttutorial.net/');
    // }
  
    return (
      <>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please Login to continue.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" href={loginUrl}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }