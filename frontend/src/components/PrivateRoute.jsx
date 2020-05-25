import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ isAuthenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/register",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.isAuthenticated,
  }
}

export default connect(mapStateToProps)(PrivateRoute);
