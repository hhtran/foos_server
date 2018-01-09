import React, { Component } from "react";
import httpClient from "../../handlers/httpClient";

export default class Logout extends Component {
  componentDidMount() {
    httpClient.get("/api/account/logout");
  }

  render() {
    return <div>Logout</div>;
  }
}
