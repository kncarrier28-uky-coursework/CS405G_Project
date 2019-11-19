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
    let saleView;

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    if (this.state.item.saleAmount !== 0) {
      saleView = (
        <span>
          <del>{formatter.format(this.state.item.cost)}</del>&nbsp;
          <ins>
            {formatter.format(
              this.state.item.cost * (1 - this.state.item.saleAmount)
            )}
          </ins>
          <br />
          <div className="is-size-5 has-text-centered">
            {this.state.item.saleAmount * 100} % Off!
          </div>
        </span>
      );
    } else saleView = <span>{this.state.item.cost}</span>;
    return (
      <div>
        <Heading className="has-text-centered">
          {this.state.item.itemName}
        </Heading>
        <div className="is-size-4">
          <span className="has-text-weight-semibold">Cost:</span> $ {saleView}
        </div>
        <div className="columns">
          <div className="column">
            <p className="is-size-4">
              <span className="has-text-weight-semibold">Stock:</span>&nbsp;
              {this.state.item.stock}
            </p>
          </div>
          <div className="column">Add To Cart Button</div>
        </div>
      </div>
    );
  }
}
