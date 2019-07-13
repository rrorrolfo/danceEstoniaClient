import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './resultCard.css';
import {
  venue,
  clock,
  calendar,
  coupleDancing,
  mark,
  hotel
} from '../../assets/icons';

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
          {category === 'festivals' ? (
            <Card.Text className="result-card-details">
              {calendar('no-margin-top')}
              {result.dateOfEvent}
            </Card.Text>
          ) : null}
          <Card.Text
            className={
              category === 'events' ? 'result-card-details' : 'result-card-data'
            }
          >
            {category === 'events'
              ? venue('no-margin-top')
              : hotel('no-margin-top')}
            {`${result.venueOfEvent}`}
          </Card.Text>
          {category === 'events' ? (
            <Card.Text className="result-card-data">
              {clock('no-margin-top')}
              {`${result.timeOfEvent || null} `}
            </Card.Text>
          ) : null}
          <Card.Text className="result-card-data">
            {mark('no-margin-top')}
            {`${result.venueAddress}, ${result.cityOfEvent}, ${
              result.countryOfEvent
            }`}
          </Card.Text>
          <Card.Text className="result-card-data">
            {coupleDancing('no-margin-top')}
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
