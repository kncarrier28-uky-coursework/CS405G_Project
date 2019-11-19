import React from "react";
import { Heading } from "react-bulma-components";

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
    props.itemId
      ? (this.state.item.itemId = props.itemId)
      : (this.state.item = props.item);
  }

  render() {
    return (
      <div>
        <Heading>{this.state.item.itemName}</Heading>
        <p>{console.log(this.state.item)}</p>
      </div>
    );
  }
}
