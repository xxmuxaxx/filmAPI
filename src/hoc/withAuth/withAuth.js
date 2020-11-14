import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

const withAuth = (Component) => {
  class WithAuth extends React.Component {
    render() {
      if (!this.props.user) return <Redirect to="/profile/auth/" />;
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { user: state.users.user };
  };

  return connect(mapStateToProps)(WithAuth);
};

export default withAuth;
