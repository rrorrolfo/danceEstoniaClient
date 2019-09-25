import React from 'react';
import PropTypes from 'prop-types';
import ResultsContainer from '../../containers/resultsContainer';

const AllEventsManager = ({
  isAdmin,
  match,
  toggleLoader,
  updateLoaderText
}) => {
  return (
    <React.Fragment>
      <div style={{ marginTop: '100px' }}>
        <ResultsContainer
          isAdmin={isAdmin}
          topLevelMatch={match}
          category="events"
          toggleLoader={toggleLoader}
          updateLoaderText={updateLoaderText}
        />
        <ResultsContainer
          isAdmin={isAdmin}
          topLevelMatch={match}
          category="festivals"
          toggleLoader={toggleLoader}
          updateLoaderText={updateLoaderText}
        />
      </div>
    </React.Fragment>
  );
};

AllEventsManager.propTypes = {
  isAdmin: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  match: PropTypes.object,
  toggleLoader: PropTypes.func,
  updateLoaderText: PropTypes.func
};

AllEventsManager.defaultProps = {
  isAdmin: false,
  match: null,
  toggleLoader: null,
  updateLoaderText: null
};

export default AllEventsManager;
