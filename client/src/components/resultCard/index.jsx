import React from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import './resultCard.css';
import festivalImage from '../../assets/salsa-festival.jpg';

const ResultCard = () => {
  return (
    <Card className="result-card">
      <Card.Img variant="top" src={festivalImage} className="result-card-img" />
      <Card.Body className="result-card-body">
        <Card.Title>Salsa Festival</Card.Title>
        <Card.Text className="result-card-details">
          Some quick example text to build on the card title and make up the
          bulk of the content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Cras justo odio</ListGroupItem>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">More Details</Card.Link>
      </Card.Body>
    </Card>
  );
};

export default ResultCard;
