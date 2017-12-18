import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

export default class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { title: "", description: "" };
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("title", this.state.title);
    // formData.append("description", this.state.description);
    // formData.append("owner", "rileyaaaaewf");
    const body = {
      title: this.state.title,
      description: this.state.description,
      owner: "rileyaaaaewf"
    };
    fetch("/api/posts", {
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
        Create a New Post
        <FormGroup>
          <Label for="title">Title (optional)</Label>
          <Input
            onChange={e => this.setState({ title: e.target.value })}
            type="title"
            name="title"
            placeholder="Title e.g. My Vacation Adventure"
          />
        </FormGroup>
        <FormGroup>
          <Label>Description (optional)</Label>
          <Input
            type="description"
            onChange={e => this.setState({ description: e.target.value })}
            name="description"
            id="description"
            placeholder="Description e.g. Look at me in Hawaii!"
          />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    );
  }
}
