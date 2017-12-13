import React, { Component } from "react";
import logo from "./logo.svg";

export default class Users extends Component {
  componentDidMount() {
    fetch("/api/users")
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.users.map(user => <div>{user.username}</div>)}
        </p>
      </div>
    );
  }
}
