import React from "react";

import { ItemList } from "../components/Items";

import apiUrl from "../fetchAPI";

class ItemsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.fetchAllItems = this.fetchAllItems.bind(this);
  }

  componentDidMount() {
    this.fetchAllItems();
  }

  fetchAllItems() {
    fetch(apiUrl + "/items")
      .then(response => response.json())
      .then(data => {
        this.setState({ items: data });
      });
  }

  render() {
    return (
      <>
        <div className="level">
          <div className="level-item">
            <p className="title">Toys</p>
          </div>
        </div>
        <ItemList
          userId={this.props.userId}
          items={this.state.items}
          refreshItems={this.fetchAllItems}
          inCart={false}
        />
      </>
    );
  }
}

export default ItemsPage;
