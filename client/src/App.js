import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  BrowserRouter
} from "react-router-dom";
import Users from "./components/Users";
import Page404 from "./components/Page404";
import Login from "./components/Login";
import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <html>
        <head />
        <body>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/users" component={Users} />
              <Route path="/login" component={Login} />
              <Route path="*" component={Page404} />
            </Switch>
          </BrowserRouter>
        </body>
      </html>
    );
  }
}

export default App;
