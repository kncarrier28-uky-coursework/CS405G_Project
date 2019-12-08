import React from "react";

import { Item } from "./";

export class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      itemIds: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({ items: this.props.items });
    }
    if (this.props.itemIds !== prevProps.itemIds) {
      this.setState({ itemIds: this.props.itemIds });
    }
  }

  render() {
    let view = [];
    if (this.state.items.length !== 0) {
      this.state.items.forEach(item => {
        view.push(
          <div
            className="column is-one-quarter-fullhd is-one-third-widescreen is-full-mobile"
            key={item.itemId}
          >
            <div className="box">
              <Item
                item={item}
                inCart={this.props.inCart}
                userId={this.props.userId}
                refreshItems={this.props.refreshItems}
              />
            </div>
          </div>
        );
      });
    } else {
      this.state.itemIds.forEach(id => {
        view.push(
          <div
            className="column is-one-quarter-fullhd is-one-third-widescreen is-full-mobile"
            key={id}
          >
            <div className="box">
              <Item
                itemId={id}
                inCart={this.props.inCart}
                userId={this.props.userId}
                refreshItems={this.props.refreshItems}
              />
            </div>
          </div>
        );
      });
    }
    return <div className="columns is-multiline">{view}</div>;
  }
}
