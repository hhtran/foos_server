import React, { Component } from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import PostCreate from "./components/posts/PostCreate";
import UsersIndex from "./components/users/UsersIndex";
import UserProfile from "./components/users/UserProfile";
import Page404 from "./components/Page404";
import Login from "./components/users/Login";
import Logout from "./components/users/Logout";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import PrivateRoute from "./components/PrivateRoute";
import SecretZone from "./components/SecretZone";
import Register from "./components/users/Register";
import ResetPassword from "./components/users/ResetPassword";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <html>
          <head />
          <body>
            <NavBar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/users" exact component={UsersIndex} />
              <Route path="/users/:username" component={UserProfile} />
              <Route path="/account/reset/:token" component={ResetPassword} />
              <Route path="/posts/new" component={PostCreate} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={Register} />
              <PrivateRoute
                path="/secret"
                authenticated={false}
                component={SecretZone}
              />
              <Route path="*" component={Page404} />
            </Switch>
          </body>
        </html>
      </BrowserRouter>
    );
  }
}

export default App;
