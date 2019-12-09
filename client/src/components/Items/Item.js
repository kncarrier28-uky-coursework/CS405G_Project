import React from "react";
import { Heading } from "react-bulma-components";

import { CartButton } from "./";

import apiUrl from "../../fetchAPI";

export class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      inCart: props.inCart
    };

    this.fetchItem = this.fetchItem.bind(this);

    props.itemId
      ? (this.state.item.itemId = props.itemId)
      : (this.state.item = props.item);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item !== this.props.item)
      this.setState({ item: this.props.item });
  }

  fetchItem(id) {
    fetch(apiUrl + `/items/${id}`)
      .then(res => res.json())
      .then(data => console.log(data));
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
    } else
      saleView = (
        <div className="column is-size-5">
          <span>{formatter.format(this.state.item.cost)}</span>
        </div>
      );

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
              <span className="has-text-weight-semibold">
                {this.state.inCart !== false ? "Quantity" : "Stock"}:
              </span>
              &nbsp;
              {this.state.inCart !== false
                ? this.state.item.quantity
                : this.state.item.stock}
            </p>
          </div>
        </div>
        {this.props.inCart != null ? (
          <div className="columns">
            <div className="column  is-vcentered">
              <CartButton
                inCart={this.state.inCart}
                itemId={this.state.item.itemId}
                userId={this.props.userId}
                maxEdit={
                  this.state.inCart
                    ? this.state.item.quantity
                    : this.state.item.stock
                }
                refreshItems={this.props.refreshItems}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
