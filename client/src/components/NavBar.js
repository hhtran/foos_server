import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">Logout</Link>
        <Link to="/register">Register</Link>
        <Link to="/secret">Secret</Link>
        <Link to="/posts/new">Create a New Post</Link>
      </div>
    );
  }
}
