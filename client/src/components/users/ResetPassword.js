import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import httpClient from "../../handlers/httpClient";
import { withRouter } from "react-router";

export class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
    this.handleResetPasswordSubmit = this.handleResetPasswordSubmit.bind(this);
  }

  handleResetPasswordSubmit = e => {
    e.preventDefault();

    const body = {
      email: this.state.email,
      password: this.state.password
    };

    debugger;
    const { match: { params: { token } } } = this.props;

    httpClient.post(`/api/account/reset/${token}`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleResetPasswordSubmit}>
          Login
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              onChange={e => this.setState({ email: e.target.value })}
              id="email"
              placeholder="user@example.com"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              onChange={e => this.setState({ password: e.target.value })}
              id="password"
              placeholder="Your new password - e.g. hunter2"
            />
          </FormGroup>
          <Button color="primary">Reset Password</Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(ResetPassword);
