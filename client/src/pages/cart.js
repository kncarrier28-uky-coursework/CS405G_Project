import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

export function CartPage() {
  let match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/confirm`}>
        <h2>Confirm Order Page</h2>
      </Route>
      <Route path={`${match.path}/`}>
        <h2>Cart Page</h2>
      </Route>
    </Switch>
  );
}
