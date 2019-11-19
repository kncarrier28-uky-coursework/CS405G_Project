import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export function ItemsPage() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/:itemId`}>
        <h2>Display Specific Item</h2>
      </Route>
      <Route path={match.url}>
        <h2>Display All Items</h2>
      </Route>
    </Switch>
  );
}
