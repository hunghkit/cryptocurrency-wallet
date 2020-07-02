import React from 'react';
import PropTypes from 'prop-types';

const UnauthLayout = (props) => <div className="app">{props.children}</div>;

UnauthLayout.propTypes = {
  children: PropTypes.any,
};

UnauthLayout.defaultProps = {};

export default UnauthLayout;
