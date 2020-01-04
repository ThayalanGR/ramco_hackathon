import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./components";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route component={Home} exact path="/" />
        </Switch>
      </Fragment>
    );
  }
}
