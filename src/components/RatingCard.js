import { ListGroup } from "react-bootstrap"

const config = require('../utils/config');

export default function RatingCard({rating, title}) {
    return (
        <ListGroup.Item>
            <h5>{title}</h5>
            <ListGroup horizontal>
                <ListGroup.Item>Overall: {rating.overall} / 5</ListGroup.Item>
                <ListGroup.Item>Workload: {rating.workload} / 5</ListGroup.Item>
                <ListGroup.Item>Easiness: {rating.easiness} / 5</ListGroup.Item>
                <ListGroup.Item>Usefulness: {rating.usefulness} / 5</ListGroup.Item>
            </ListGroup>
            <p>Advice: {rating.advice}</p>
        </ListGroup.Item>
    )
}