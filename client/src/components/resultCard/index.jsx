import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './resultCard.css';

const ResultCard = ({ result, match, category }) => {
  const { style } = match.params;
  return (
    <Card className="result-card">
      <Link
        to={
          style
            ? `/${category}/${style}/${result._id}`
            : `/${category}/${result.styles[0]}/${result._id}`
        }
      >
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
      </Link>
    </Card>
  );
};

ResultCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  result: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object
};

ResultCard.defaultProps = {
  result: null,
  match: null
};

export default ResultCard;
