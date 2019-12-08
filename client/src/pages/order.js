import React from "react";

import { ItemList } from "../components/Items";
import { Redirect } from "react-router-dom";

import apiUrl from "../fetchAPI";

class OrderPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      orderNumber: props.orderNumber | null,
      status: props.status | null,
      datePlaced: props.datePlaced | null
    };

    this.fetchOrder = this.fetchOrder.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
  }

  componentDidMount() {
    this.setState(
      { orderNumber: this.props.match.params.orderNumber },
      this.fetchOrder
    );
  }

  fetchOrder() {
    fetch(apiUrl + `/orders/${this.state.orderNumber}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          items: data.items,
          status: data.status,
          datePlaced: data.datePlaced
        });
      });
  }

  cancelOrder() {
    fetch(apiUrl + `/orders/cancel`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ orderNumber: this.state.orderNumber })
    }).then(() => {
      this.setState({ redirect: true });
    });
  }

  render() {
    const status =
      String(this.state.status)
        .charAt(0)
        .toUpperCase() + String(this.state.status).substring(1);
    if (this.state.redirect === true) return <Redirect to="/orders" />;
    return (
      <div>
        <div className="columns">
          <div className="column">
            <p className="title">Order Number: {this.state.orderNumber}</p>
            <p className="subtitle">
              {status} - {this.state.datePlaced}
            </p>
          </div>
          {this.state.status === "pending" ? (
            <div className="column is-narrow">
              <button className="button is-danger" onClick={this.cancelOrder}>
                Cancel Order
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
        <ItemList items={this.state.items} userId={this.props.userId} />
      </div>
    );
  }
}

export default OrderPage;
