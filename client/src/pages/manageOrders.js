import React from "react";

import { Link } from "react-router-dom";
import apiUrl from "../fetchAPI";

class ManageOrdersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      displayOrders: []
    };

    this.fetchOrders = this.fetchOrders.bind(this);
    this.sortBy = this.sortBy.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.shipOrder = this.shipOrder.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders() {
    fetch(apiUrl + `/orders`)
      .then(res => res.json())
      .then(data => this.setState({ orders: data, displayOrders: data }));
  }

  cancelOrder(orderNumber) {
    fetch(apiUrl + `/orders/cancel`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ orderNumber: orderNumber })
    }).then(() => {
      this.fetchOrders();
    });
  }

  shipOrder(orderNumber) {
    fetch(apiUrl + `/orders/shipped`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ orderNumber: orderNumber })
    }).then(() => {
      this.fetchOrders();
    });
  }

  sortBy(method) {
    this.setState({ displayOrders: [] }, () => {
      let sortedOrders = [];
      if (method === "pending") {
        this.state.orders.forEach(order => {
          if (order.status === "pending") sortedOrders.push(order);
        });
      } else if (method === "all") {
        sortedOrders = this.state.orders;
      } else if (method === "canceled") {
        this.state.orders.forEach(order => {
          if (order.status === "canceled") sortedOrders.push(order);
        });
      } else if (method === "shipped") {
        this.state.orders.forEach(order => {
          if (order.status === "shipped") sortedOrders.push(order);
        });
      }
      this.setState({ displayOrders: sortedOrders });
    });
  }

  render() {
    const orderList = this.state.displayOrders.map(order => (
      <tr key={order.orderNumber}>
        <td>
          <Link to={`/order/${order.orderNumber}`}>{order.orderNumber}</Link>
        </td>
        <td>{order.datePlaced}</td>
        <td>
          {String(order.status)
            .charAt(0)
            .toUpperCase() + String(order.status).substring(1)}
        </td>
        {order.status === "pending" ? (
          <>
            <td>
              <button
                className="button is-primary"
                onClick={() => this.shipOrder(order.orderNumber)}
              >
                Complete Order
              </button>
            </td>
            <td>
              <button
                className="button is-danger"
                onClick={() => this.cancelOrder(order.orderNumber)}
              >
                Cancel Order
              </button>
            </td>
          </>
        ) : (
          <>
            <td></td>
            <td></td>
          </>
        )}
      </tr>
    ));
    return (
      <>
        <div className="level">
          <div className="level-item">
            <p className="title">Manage Orders</p>
          </div>
        </div>
        <div className="level">
          <div className="level-item">
            <button
              className="button is-link is-large"
              onClick={() => this.sortBy("all")}
            >
              All orders
            </button>
          </div>
          <div className="level-item">
            <button
              className="button is-link is-large"
              onClick={() => this.sortBy("pending")}
            >
              Pending orders
            </button>
          </div>
          <div className="level-item">
            <button
              className="button is-link is-large"
              onClick={() => this.sortBy("canceled")}
            >
              Canceled orders
            </button>
          </div>
          <div className="level-item">
            <button
              className="button is-link is-large"
              onClick={() => this.sortBy("shipped")}
            >
              Shipped orders
            </button>
          </div>
        </div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date Placed</th>
              <th>Status</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{orderList}</tbody>
        </table>
      </>
    );
  }
}

export default ManageOrdersPage;
