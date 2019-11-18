import React from "react";
import { Switch, Route, Link } from "react-router-dom";

export class ItemsPage extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/">
          <h2>Display All Items</h2>
        </Route>
        <Route path="/:itemId">
          <h2>Display Specific Item</h2>
        </Route>
      </Switch>
    );
  }
}
