import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { ItemList } from "../components/Items";

import apiUrl from "../fetchAPI";

class CartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orderNumber: null
    };

    this.fetchCartOrderNumber = this.fetchCartOrderNumber.bind(this);
  }

  fetchCartOrderNumber() {
    fetch(apiUrl + `/cart/${this.props.userId}`)
      .then(res => res.json())
      .then(data => console.log(data));
  }

  render() {
    let match = this.props.match;
    return (
      <Switch>
        <Route path={`${match.path}/confirm`}>
          <h2>Confirm Order Page</h2>
        </Route>
        <Route path={`${match.path}/`}>
          <ItemList orderNumber={this.state.orderNumber} />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(CartPage);
