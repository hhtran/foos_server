import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import httpClient from "../../handlers/httpClient";

export default class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { title: "", description: "" };
  }

  handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("description", this.state.description);
    formData.append("owner", "rileyaaaaewf");
    formData.append("photo", this.state.files[0]);

    httpClient.post("/api/posts", formData, {
      headers: {
        Accept: "multipart/form-data"
      }
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
          <Input
            type="file"
            onChange={e => {
              console.log(e.target.files);
              this.setState({ files: e.target.files });
            }}
            name="photo"
            accept="image/gif, image/png, image/jpeg"
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
