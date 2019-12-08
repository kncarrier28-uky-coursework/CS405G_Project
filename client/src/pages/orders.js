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
        <td></td>
        <td>{order.status}</td>
      </tr>
    ));
    return (
      <table className="table">
        <thead>
          <tr>
            <td>Order</td>
            <td>Date Placed</td>
            <td>Status</td>
          </tr>
        </thead>
        <tbody>{orderList}</tbody>
      </table>
    );
  }
}

export default OrdersPage;
