import Container from "react-bootstrap/Container";

import Filter from "./Filter";
import { CLIENT_URL } from "../utils/config";

export default function Homepage() {

  return (
    <div className="m-0 p-0 container-fluid d-flex justify-content-center align-items-center" style={{height: '560px', backgroundImage: `url('${CLIENT_URL}/assets/lake.jpeg')`, backgroundSize: 'cover'}}>
      <div>
        <p className="lead">
          <em>Course review platform of the students, by the students, for the students</em>
        </p>
        <Filter />
      </div>
    </div>
  );
};