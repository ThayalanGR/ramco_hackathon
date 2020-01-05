import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Callback, Success } from "./components";

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route component={Home} path="/r/:name" />
          <Route component={Callback} path="/callback/:name/:email" />
          <Route component={Success} exact path="/success" />
          <Route
            render={() => {
              return <div>Requested url not found</div>;
            }}
          />
        </Switch>
      </Fragment>
    );
  }
}
