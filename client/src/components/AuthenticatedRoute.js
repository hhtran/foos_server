import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import httpClient from "../handlers/httpClient";
import { withState } from "recompose";

class AuthenticatedRoute extends Component {
  componentDidMount() {
    debugger;
    const { setAuthenticated, authenticated } = this.props;
    httpClient.get("/api/authenticated").then(res => {
      if (res.status === 200) {
        setAuthenticated(authenticated);
      }
    });
  }

  render() {
    const { component: Component, authenticated, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          return authenticated ? <Component {...props} /> : null;
        }}
      />
    );
  }
}

export default withState("authenticated", "setAuthenticated", false)(
  AuthenticatedRoute
);
