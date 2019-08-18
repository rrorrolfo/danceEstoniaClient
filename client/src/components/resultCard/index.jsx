import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './resultCard.css';
import { arrayToUpperCase, isoStringToDate } from '../../utils';
import {
  venue,
  clock,
  calendar,
  coupleDancing,
  mark,
  hotel
} from '../../assets/icons';

const ResultCard = ({ result, match, category, canDelete }) => {
  return (
    <Card className="result-card">
      <Link
        to={
          match.params.style
            ? `/${category}/${match.params.style}/${result._id}`
            : `/${category}/${result.styles[0]}/${result._id}`
        }
      >
        <div className="result-card-data-container">
          <Card.Img
            variant="top"
            src={`http://localhost:5000/${result.imageURL}`}
            className="result-card-img"
          />
          <Card.Body className="result-card-body">
            <Card.Title>{result.name}</Card.Title>
            <Card.Text className="result-card-details">
              {calendar('no-margin-top')}
              {isoStringToDate(result.dateOfEvent)}
            </Card.Text>
            <Card.Text className="result-card-data">
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
              {arrayToUpperCase(result.styles)}
            </Card.Text>
          </Card.Body>
        </div>
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
  match: PropTypes.object,
  canDelete: PropTypes.bool
};

ResultCard.defaultProps = {
  result: null,
  match: null,
  canDelete: false
};

export default ResultCard;
