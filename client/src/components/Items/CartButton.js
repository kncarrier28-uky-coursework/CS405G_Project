import React from "react";

import { Redirect } from "react-router-dom";

import apiUrl from "../../fetchAPI";

export class CartButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId,
      itemId: props.itemId,
      quantity: 1,
      redirect: false
    };

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.refreshItems = this.refreshItems.bind(this);
  }

  refreshItems() {
    this.props.refreshItems();
  }

  handleChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;

    if (name === "quantity") value = Number(value);

    this.setState({
      [name]: value
    });
  }

  addToCart() {
    fetch(apiUrl + `/cart/${this.state.userId}/add`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        itemId: this.state.itemId,
        quantity: this.state.quantity
      })
    }).then(() => {
      this.refreshItems();
      this.setState({ redirect: true });
    });
  }

  removeFromCart() {
    fetch(apiUrl + `/cart/${this.state.userId}/remove`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        itemId: this.state.itemId,
        quantity: this.state.quantity
      })
    }).then(() => this.refreshItems());
  }

  render() {
    let buttonText = "";
    this.props.inCart ? (buttonText = "Remove") : (buttonText = "Add To Cart");
    if (this.state.redirect === true) return <Redirect to="/cart" />;
    return (
      <div className="columns">
        <div className="column is-auto">
          <div className="field">
            <div className="control">
              <label className="label">Quantity</label>
              <input
                name="quantity"
                type="number"
                min="0"
                max={this.props.maxEdit}
                step="1"
                className="input"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <div className="control">
              <label className="label">&nbsp;</label>
              <button
                className={`
                  button ${this.props.inCart ? "is-danger" : "is-primary"}
                `}
                onClick={
                  this.props.inCart ? this.removeFromCart : this.addToCart
                }
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
