import React from "react";
import apiUrl from "../../fetchAPI";

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
    return fetch(apiUrl + "/items")
      .then(response => response.json())
      .then(data => this.setState({ items: data }));
  }

  render() {
    let view = [];
    this.state.items.forEach(item => {
      view.push(
        <div className="column is-one-quarter">
          <div className="box">
            <Item item={item} />
          </div>
        </div>
      );
    });
    return <div className="columns is-multiline">{view}</div>;
  }
}
