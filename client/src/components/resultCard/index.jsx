import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CTAs from './CTAs';
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

const ResultCard = ({
  result,
  match,
  category,
  isAdmin,
  canAuth,
  toggleLoader,
  updateLoaderText,
  selectedLang
}) => {
  return (
    <Card
      className="result-card"
      onClick={() => {
        if (!isAdmin) {
          updateLoaderText(result.name);
          toggleLoader(true);
        }
      }}
    >
      <Link
        to={
          match && match.params.style
            ? `/${category}/${match.params.style}/${result._id}`
            : `/${category}/${result.styles[0]}/${result._id}`
        }
      >
        <div className="result-card-data-container">
          <Card.Img
            variant="top"
            src={result.imageURL}
            className="result-card-img"
          />
          <Card.Body className="result-card-body">
            <Card.Title>{result.name}</Card.Title>
            <Card.Text className="result-card-details">
              {calendar('no-margin-top')}
              {isoStringToDate(result.dateOfEvent, selectedLang)}
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
              {result.venueAddress
                ? `${result.venueAddress}, ${result.cityOfEvent}, ${
                    result.countryOfEvent
                  }`
                : `${result.cityOfEvent}, ${result.countryOfEvent}`}
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
      {isAdmin ? (
        <CTAs
          category={category}
          id={result._id}
          canAuth={canAuth}
          style={result.styles[0]}
        />
      ) : null}
    </Card>
  );
};

ResultCard.propTypes = {
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  result: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object,
  isAdmin: PropTypes.bool,
  canAuth: PropTypes.bool,
  toggleLoader: PropTypes.func,
  selectedLang: PropTypes.oneOf(['eng', 'est'])
};

ResultCard.defaultProps = {
  result: null,
  match: null,
  isAdmin: false,
  canAuth: false,
  toggleLoader: null,
  selectedLang: 'est'
};

export default ResultCard;
