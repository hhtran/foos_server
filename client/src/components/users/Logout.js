import React, { Component } from "react";

export default class Logout extends Component {
  componentDidMount() {
    fetch("/api/users/logout");
  }

  render() {
    return <div>Logout</div>;
  }
}
