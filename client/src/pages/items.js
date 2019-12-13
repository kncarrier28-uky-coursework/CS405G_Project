import React from "react";

import { ItemList } from "../components/Items";

import apiUrl from "../fetchAPI";

class ItemsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchTerm: null
    };

    this.fetchAllItems = this.fetchAllItems.bind(this);
    this.searchItems = this.searchItems.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  searchItems() {
    fetch(apiUrl + "/items?searchTerm=" + this.state.searchTerm)
      .then(response => response.json())
      .then(data => {
        this.setState({ items: data });
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
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
        <div className="field has-addons">
          <div className="control is-expanded">
            <input
              type="text"
              className="input"
              placeholder="Keyword or Category"
              onChange={this.handleChange}
              name="searchTerm"
            />
          </div>
          <div className="control">
            <button className="button is-primary" onClick={this.searchItems}>
              Search
            </button>
          </div>
          {this.state.searchTerm ? (
            <div className="control">
              <button
                className="button is-danger"
                onClick={() => {
                  this.fetchAllItems();
                  this.setState({ searchTerm: null });
                }}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <></>
          )}
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
