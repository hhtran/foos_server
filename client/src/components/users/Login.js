import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { username: "", password: "" };
  }

  handleSubmit(e) {
    e.preventDefault();

    const body = {
      username: this.state.username,
      password: this.state.password
    };

    fetch("/api/users/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
        <Button color="secondary">Forgot your password?</Button>
      </Form>
    );
  }
}
