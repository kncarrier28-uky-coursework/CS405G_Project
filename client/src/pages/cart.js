import React from "react";

import { ItemList } from "../components/Items";
import { Redirect } from "react-router-dom";

import apiUrl from "../fetchAPI";

class CartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      orderNumber: null,
      redirect: false
    };

    this.fetchCart = this.fetchCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
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

  placeOrder() {
    fetch(apiUrl + `/orders/pending`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ orderNumber: this.state.orderNumber })
    })
      .then(() => this.setState({ redirect: true }))
      .catch(error => console.log(error));
  }

  render() {
    if (this.state.redirect === true)
      return <Redirect to={`order/${this.state.orderNumber}`} />;
    return (
      <div>
        <div className="level">
          <div className="level-item">
            <p className="title">Cart</p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <p className="title">Order Number: {this.state.orderNumber}</p>
          </div>
          {this.state.items.length === 0 ? (
            <></>
          ) : (
            <div className="column is-narrow">
              <button className="button is-primary" onClick={this.placeOrder}>
                Place Order
              </button>
            </div>
          )}
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
