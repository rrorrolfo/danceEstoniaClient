import React from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteRequest, updateRequest } from '../../requests/requests';

const CTAs = ({ category, id, canAuth }) => {
  const deleteRecord = (cat, recordID) => {
    deleteRequest({
      endPoint: `/${cat}/${recordID}`
    })
      .then(response =>
        window.alert(`${response} ${cat} erased with id: ${recordID}`)
      )
      .catch(error => window.alert(`${error} for event record: ${recordID}`));
  };
  const updateRecord = (cat, recordID) => {
    const eventData = new FormData();
    eventData.append('isAuthorized', true);
    updateRequest(
      {
        endPoint: `/${cat}/${recordID}`
      },
      eventData
    )
      .then(response =>
        window.alert(
          `${response}, ${cat.slice(0, cat.length - 1)} has been authorized`
        )
      )
      .catch(error =>
        window.alert(`${error} when trying to update the ${cat}`)
      );
  };
  return (
    <Container className="admin-CTAs-container">
      {canAuth ? (
        <Button
          className="admin-cta"
          variant="success"
          onClick={() => updateRecord(category, id)}
        >
          Authorize
        </Button>
      ) : null}
      <Button className="admin-cta" variant="warning">
        Edit
      </Button>
      <Button
        className="admin-cta"
        variant="danger"
        onClick={() => deleteRecord(category, id)}
      >
        Delete
      </Button>
    </Container>
  );
};

CTAs.propTypes = {
  category: PropTypes.oneOf(['events', 'festivals']).isRequired,
  id: PropTypes.string.isRequired,
  canAuth: PropTypes.bool
};

CTAs.defaultProps = {
  canAuth: false
};

export default CTAs;
