import Container from "react-bootstrap/Container";

import Filter from "./Filter";
import { CLIENT_URL } from "../utils/config";

export default function Homepage() {

  return (
    <Container className="mx-auto my-3 p-0 rounded d-flex justify-content-center align-items-center" style={{width: '1320px', height: '560px', backgroundImage: `url('${CLIENT_URL}/assets/lake.jpeg')`, backgroundSize: 'cover'}}>
      <Filter />
    </Container>
  );
};