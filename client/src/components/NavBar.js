import React, { Component } from "react";
import { Link } from "react-router-dom";
import { css, StyleSheet } from "aphrodite";

export default class NavBar extends Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <Link className={css(styles.link)} to="/">
          Home
        </Link>
        <Link className={css(styles.link)} to="/users">
          Users
        </Link>
        <Link className={css(styles.link)} to="/login">
          Login
        </Link>
        <Link className={css(styles.link)} to="/logout">
          Logout
        </Link>
        <Link className={css(styles.link)} to="/register">
          Register
        </Link>
        <Link className={css(styles.link)} to="/secret">
          Secret
        </Link>
        <Link className={css(styles.link)} to="/posts/new">
          Create a New Post
        </Link>
      </div>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1E1E",
    color: "white",
    display: "flex",
    justifyContent: "space-around"
  },
  link: {
    color: "white",
    fontSize: 14,
    padding: "5px 10px",
    textAlign: "center",
    flex: 1,
    ":hover": {
      backgroundColor: "#101010",
      textDecoration: "none"
    }
  }
});
