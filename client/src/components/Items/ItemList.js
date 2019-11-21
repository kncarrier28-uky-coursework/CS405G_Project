import React from "react";

import { Item } from "./";

export class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setState({ items: this.props.items });
    }
  }

  render() {
    let view = [];
    this.state.items.forEach(item => {
      view.push(
        <div
          className="column is-one-quarter-fullhd is-one-third-widescreen is-full-mobile"
          key={item.itemId}
        >
          <div className="box">
            <Item
              item={item}
              inCart={this.props.inCart || false}
              userId={this.props.userId}
              refreshItems={this.props.refreshItems}
            />
          </div>
        </div>
      );
    });
    return <div className="columns is-multiline">{view}</div>;
  }
}
