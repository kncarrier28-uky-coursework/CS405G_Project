import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

class CartPage extends React.Component {
  render() {
    let match = this.props.match;
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
}

export default withRouter(CartPage);
