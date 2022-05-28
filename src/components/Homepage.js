import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import Filter from "./Filter";


export default function Homepage() {

  return (
    <Container className="mx-auto mt-3 p-3">
      {/* <img src={CLIENT_URL+'/assets/lake.jpeg'} className="image-fluid" width={} /> */}
      <Filter />
    </Container>
  );
};