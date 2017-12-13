import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  BrowserRouter
} from "react-router-dom";
import Users from "./Users";
import Page404 from "./Page404";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="*" component={Page404} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
