import React, { Component } from "react";
import logo from "../../logo.svg";

const Post = ({ _id, title, description }) => {
  return (
    <div>
      <div>Id: {_id}</div>
      <div>Title: {title}</div>
      <div>Description: {description}</div>
    </div>
  );
};

export default class UsersIndex extends Component {
  async componentDidMount() {
    try {
      const { username } = this.props.match.params;
      const [userRes, postsRes] = await Promise.all([
        fetch(`/api/users/${username}`),
        fetch(`/api/users/${username}/posts`)
      ]);
      const user = await userRes.json();
      const posts = await postsRes.json();
      console.log(posts);
      this.setState({ user, posts });
    } catch (e) {
      console.error(e);
    }
  }

  constructor(props) {
    super(props);
    this.state = { user: null, posts: [] };
  }

  render() {
    const user = this.state.user;
    const posts = this.state.posts;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Users Profile</h1>
        </header>
        <p className="App-intro">Username: {user && user.username}</p>
        <p className="App-intro">Name: {user && user.name}</p>
        <div>Posts: {posts.map(post => <Post {...post} />)}</div>
      </div>
    );
  }
}
