import React from "react";

import { Link } from "react-router-dom";

import apiUrl from "../fetchAPI";

class OrdersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.userId,
      orders: []
    };

    this.fetchOrders = this.fetchOrders.bind(this);
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders() {
    fetch(apiUrl + `/orders?userId=${this.state.userId}`)
      .then(res => res.json())
      .then(data => this.setState({ orders: data }));
  }

  render() {
    const orderList = this.state.orders.map(order => (
      <tr key={order.orderNumber}>
        <td>
          <Link to={`order/${order.orderNumber}`}>{order.orderNumber}</Link>
        </td>
        <td>{order.datePlaced}</td>
        <td>
          {String(order.status)
            .charAt(0)
            .toUpperCase() + String(order.status).substring(1)}
        </td>
      </tr>
    ));
    return (
      <>
        <div className="level">
          <div className="level-item">
            <p className="title">My Orders</p>
          </div>
        </div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date Placed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{orderList}</tbody>
        </table>
      </>
    );
  }
}

export default OrdersPage;
