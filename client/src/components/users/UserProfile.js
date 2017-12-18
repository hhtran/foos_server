import React, { Component } from "react";
import logo from "../../logo.svg";

export default class UsersIndex extends Component {
  async componentDidMount() {
    try {
      const { username } = this.props.match.params;
      const res = await fetch(`/api/users/${username}`);
      const user = await res.json();
      this.setState({ user });
    } catch (e) {
      console.error(e);
    }
  }

  constructor(props) {
    super(props);
    this.state = { user: null };
  }

  render() {
    const user = this.state.user;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Users Profile</h1>
        </header>
        <p className="App-intro">Username: {user && user.username}</p>
        <p className="App-intro">Name: {user && user.name}</p>
      </div>
    );
  }
}
