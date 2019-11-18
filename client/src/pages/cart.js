import React from "react";
import { Switch, Route, Link } from "react-router-dom";

export class CartPage extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
  }
}
