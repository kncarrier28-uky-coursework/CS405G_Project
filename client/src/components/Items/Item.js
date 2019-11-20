import React from "react";
import { Heading } from "react-bulma-components";

import { CartButton } from "./";

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
        <div className="column is-size-5">
          <div className="columns is-gapless is-multiline">
            <div className="column is-full">
              <del>{formatter.format(this.state.item.cost)}</del>&nbsp;
              <ins>
                {formatter.format(
                  this.state.item.cost * (1 - this.state.item.saleAmount)
                )}
              </ins>
            </div>
            <div className="column is-size-6 is-full">
              {this.state.item.saleAmount * 100} % Off!
            </div>
          </div>
        </div>
      );
    } else saleView = <span>{this.state.item.cost}</span>;

    return (
      <div>
        <div className="columns">
          <div className="column">
            <Heading className="has-text-centered">
              {this.state.item.itemName}
            </Heading>
          </div>
        </div>
        <div className="columns">
          <div className="column is-size-4">
            <span className="has-text-weight-semibold">Cost:</span>
          </div>
          {saleView}
          <div className="column">
            <p className="is-size-4">
              <span className="has-text-weight-semibold">Stock:</span>&nbsp;
              {this.state.item.stock}
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column  is-vcentered">
            <CartButton
              inCart={this.props.inCart}
              itemId={this.state.item.itemId}
              userId={this.props.userId}
              maxEdit={this.state.item.stock}
            />
          </div>
        </div>
      </div>
    );
  }
}
