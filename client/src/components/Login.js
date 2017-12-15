import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class Login extends Component {
  render() {
    return (
      <div>
        Login
        <Label for="username">Username</Label>
        <Input
          type="username"
          name="username"
          id="username"
          placeholder="riley123"
        />
        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Password e.g. hunter2"
        />
        <Button color="primary">Login</Button>
        <Button color="secondary">Forgot your password?</Button>
      </div>
    );
  }
}
