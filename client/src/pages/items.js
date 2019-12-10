import React from "react";

import { ItemList } from "../components/Items";

import apiUrl from "../fetchAPI";

class ItemsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.fetchAllItems = this.fetchAllItems.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    let value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
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

  render() {
    return (
      <>
        <div className="level">
          <div className="level-item">
            <p className="title">Toys</p>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="field">
            <label className="label">Search</label>
            <div className="control">
              <input 
                className="input"
                type="text"
                name="searchQuery"
                placeholder="Search by Category or Keyword"
                onChange={this.handleChange}
              />
            </div>
            <div className="control">
              <label className="label">&nbsp;</label>
              <button className="button is-primary" onClick={this.search}>
                Search
              </button>
            </div>
          </div>
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
