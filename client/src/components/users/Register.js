import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "",
      email: "",
      name: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", this.state.username);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("password-confirm", this.state.confirmPassword);
    formData.append("name", this.state.name);

    fetch("/api/register", {
      method: "POST",
      headers: {
        Accept: "multipart/form-data"
      },
      body: formData
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
            onChange={e => this.setState({ username: e.target.value })}
            name="username"
            placeholder="riley123"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="riley@example.com"
          />
        </FormGroup>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="name"
            name="name"
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Name e.g. Riley X"
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Password e.g. hunter2"
          />
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirm-password"
            onChange={e => this.setState({ confirmPassword: e.target.value })}
            placeholder="Re-enter the password you entered"
          />
        </FormGroup>
        <Button color="primary">Register</Button>
      </Form>
    );
  }
}
