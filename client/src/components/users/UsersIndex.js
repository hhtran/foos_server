import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import httpClient from "../../handlers/httpClient";

export default class UsersIndex extends Component {
  async componentDidMount() {
    try {
      const res = await httpClient.get("/api/users");
      const users = await res.data;
      this.setState({ users });
    } catch (e) {
      console.error(e);
    }
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
          {this.state.users.map(user => (
            <div>
              <Link to={`/users/${user.username}`}>{user.username}</Link>
            </div>
          ))}
        </p>
      </div>
    );
  }
}
