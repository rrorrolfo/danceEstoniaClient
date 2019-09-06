import React from 'react';
import { Container, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteRequest } from '../../requests/requests';

const CTAs = ({ category, id }) => {
  const deleteRecord = (cat, recordID) => {
    deleteRequest({
      endPoint: `/${cat}/${recordID}`
    })
      .then(response =>
        window.alert(`${response} ${cat} erased with id: ${recordID}`)
      )
      .catch(error => window.alert(`${error} for event record: ${recordID}`));
  };
  return (
    <Container className="admin-CTAs-container">
      <Button className="admin-cta" variant="success">
        Authorize
      </Button>
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
  id: PropTypes.string.isRequired
};

export default CTAs;
