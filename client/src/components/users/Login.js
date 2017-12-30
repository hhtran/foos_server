import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import httpClient from "../../handlers/httpClient";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", forgotPassword: "" };
  }

  handleLoginSubmit = e => {
    e.preventDefault();

    const body = {
      username: this.state.username,
      password: this.state.password
    };

    httpClient.post("/api/account/login", body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  handleForgotPasswordSubmit = e => {
    e.preventDefault();

    const body = {
      email: this.state.forgotPassword
    };

    httpClient.post("/api/account/forgot", body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleLoginSubmit}>
          Login
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="username"
              name="username"
              onChange={e => this.setState({ username: e.target.value })}
              id="username"
              placeholder="riley123"
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              onChange={e => this.setState({ password: e.target.value })}
              id="password"
              placeholder="Password e.g. hunter2"
            />
          </FormGroup>
          <Button color="primary">Login</Button>
        </Form>

        <Form onSubmit={this.handleForgotPasswordSubmit}>
          <Label for="forgot-password">Forgot password?</Label>
          <Input
            type="email"
            name="forgot-password"
            onChange={e => this.setState({ forgotPassword: e.target.value })}
          />

          <Button color="secondary">Forgot your password?</Button>
        </Form>
      </div>
    );
  }
}
