import React from "react";

import { Item } from "./";

export class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      orderNumber: null
    };
    if (props.orderNumber) this.setState({ orderNumber: props.orderNumber });
  }

  componentDidMount() {
    this.state.orderNumber
      ? this.fetchOrderItems(this.state.orderNumber)
      : this.fetchAllItems();
  }

  fetchOrderItems(orderNumber) {}

  fetchAllItems() {
    return fetch("http://knca244.cs.uky.edu:3010/items")
      .then(response => response.json())
      .then(data => this.setState({ items: data }));
  }

  render() {
    let view = [];
    this.state.items.forEach(item => {
      view.push(
        <tr key={item.itemId}>
          <td>
            <Item item={item} />
          </td>
        </tr>
      );
    });
    return (
      <table className="table is-fullwidth is-striped">
        <tbody>{view}</tbody>
      </table>
    );
  }
}
