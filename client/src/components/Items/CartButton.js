import React from "react";

import apiUrl from "../../fetchAPI";

export class CartButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId,
      itemId: props.itemId,
      quantity: 1
    };

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addToCart() {
    fetch(apiUrl + "/cart/add", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: this.state.userId,
        itemId: this.state.itemId,
        quantity: this.state.quantity
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  removeFromCart() {
    fetch(apiUrl + "/cart/remove", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: this.state.userId,
        itemId: this.state.itemId,
        quantity: this.state.quantity
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }

  render() {
    let buttonText = "";
    this.props.inCart ? (buttonText = "Remove") : (buttonText = "Add To Cart");
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
                placeholder="Password"
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
                className="button is-primary"
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
