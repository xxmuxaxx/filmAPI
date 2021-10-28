import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const withAuth = (Component) => {
  const WithAuth = (props) => {
    if (!props.user) return <Redirect to="/profile/auth/" />;
    return <Component {...props} user={props.user} />;
  };

  const mapStateToProps = (state) => {
    return { user: state.users.user };
  };

  return connect(mapStateToProps)(WithAuth);
};

export default withAuth;
