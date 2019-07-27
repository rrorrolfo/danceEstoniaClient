import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { firstLetterToUppercase } from '../../utils';

const PageCTA = ({ category, pageCount, updatePageCount }) => {
  const handleClick = () => {
    updatePageCount(pageCount + 1);
  };
  return (
    <Button
      variant="outline-primary"
      size="lg"
      className="pageCTA"
      style={{ margin: '0 auto 25px', display: 'block' }}
      onClick={() => handleClick()}
    >
      Load More {firstLetterToUppercase(category)}
    </Button>
  );
};

PageCTA.propTypes = {
  category: PropTypes.oneOf(['events', 'festivals']),
  pageCount: PropTypes.number.isRequired,
  updatePageCount: PropTypes.func.isRequired
};

PageCTA.defaultProps = {
  category: ''
};
export default PageCTA;
