import React from "react";

import { Redirect } from "react-router-dom";

import apiUrl from "../fetchAPI";

class ManageToysPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: "",
      category: "",
      keyword: "",
      cost: 0,
      stock: 0,
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
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

  addItem() {
    fetch(apiUrl + "/items/addItem", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        itemName: this.state.itemName,
        category: this.state.itemCategory,
        keyword: this.state.keyword,
        cost: this.state.cost,
        stock: this.state.stock
      })
    }).then(() => this.setState({ redirect: true }));
  }

  render() {
    if (this.state.redirect === true) return <Redirect to="/items" />;
    return (
      <>
        <div className="level">
          <div className="level-item">
            <p className="title">Add New Toy</p>
          </div>
        </div>
        <div className="field">
          <label className="label">Item Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="itemName"
              placeholder="New Item Name"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control is-expanded">
            <label className="label">Item Category</label>
            <input
              className="input"
              type="text"
              name="itemCategory"
              placeholder="Item Category"
              onChange={this.handleChange}
            />
          </div>
          <div className="control is-expanded"> 
            <label className="label">Search Keyword</label>
            <input 
              className="input"
              type="text"
              name="keyword"
              placeholder="Keyword"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control is-expanded">
            <label className="label">Price</label>
            <input
              type="number"
              className="input"
              min="0"
              name="cost"
              onChange={this.handleChange}
            />
          </div>
          <div className="control is-expanded">
            <label className="label">Stock</label>
            <input
              type="number"
              className="input"
              min="0"
              name="stock"
              onChange={this.handleChange}
            />
          </div>
          <div className="control">
            <label className="label">&nbsp;</label>
            <button className="button is-primary" onClick={this.addItem}>
              Add Item
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ManageToysPage;
