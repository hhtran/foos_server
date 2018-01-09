import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import httpClient from "../../handlers/httpClient";
import { css, StyleSheet } from "aphrodite";

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
      <div className={css(styles.container)}>
        <h1>Sign in</h1>
        <Form className={css(styles.form)} onSubmit={this.handleLoginSubmit}>
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

        <Form
          className={css(styles.form)}
          onSubmit={this.handleForgotPasswordSubmit}
        >
          <FormGroup>
            <Label for="forgot-password">Forgot your password?</Label>
            <Input
              type="email"
              name="forgot-password"
              onChange={e => this.setState({ forgotPassword: e.target.value })}
            />
          </FormGroup>

          <Button color="secondary">Send Password Reset Email</Button>
        </Form>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 50
  },
  form: {
    maxWidth: "400px",
    width: "100%",
    margin: "20px auto",
    display: "flex",
    flexDirection: "column"
  }
});
