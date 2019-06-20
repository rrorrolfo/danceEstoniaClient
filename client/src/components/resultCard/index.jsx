import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import './resultCard.css';

const ResultCard = ({ result }) => {
  return (
    <Card className="result-card">
      <Card.Img
        variant="top"
        src={`http://localhost:5000/${result.imageURL}`}
        className="result-card-img"
      />
      <Card.Body className="result-card-body">
        <Card.Title>{result.name}</Card.Title>
        <Card.Text className="result-card-details">
          {result.dateOfEvent}
        </Card.Text>
        <Card.Text className="result-card-data">
          {`${result.venueOfEvent} ${result.timeOfEvent || null} `}
        </Card.Text>
        <Card.Text className="result-card-data">
          {`${result.venueAddress}, ${result.cityOfEvent}, ${
            result.countryOfEvent
          }`}
        </Card.Text>
        <Card.Text className="result-card-description">
          {result.styles.join(', ')}
        </Card.Text>
      </Card.Body>
      {/* <ListGroup className="list-group-flush">
        <ListGroupItem>{result.ticketPrice}</ListGroupItem>
        <ListGroupItem>{result.fbEvent}</ListGroupItem>
      </ListGroup> */}
      <Card.Body>
        <Card.Link href="#">More Details</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ResultCard;
