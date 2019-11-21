import React from "react";

import { ItemList } from "../components/Items";

import apiUrl from "../fetchAPI";

class CartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      orderNumber: null
    };

    this.fetchCart = this.fetchCart.bind(this);
  }

  componentDidMount() {
    this.fetchCart();
  }

  fetchCart() {
    fetch(apiUrl + `/cart/${this.props.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ items: data.items, orderNumber: data.orderNumber });
      });
  }

  render() {
    return (
      <div>
        <div className="columns">
          <div className="column">
            <p className="title">Order Number: {this.state.orderNumber}</p>
          </div>
          <div className="column is-narrow">
            <button className="button is-primary">Place Order</button>
          </div>
        </div>
        <ItemList
          items={this.state.items}
          userId={this.props.userId}
          inCart={true}
          refreshItems={this.fetchCart}
        />
      </div>
    );
  }
}

export default CartPage;
