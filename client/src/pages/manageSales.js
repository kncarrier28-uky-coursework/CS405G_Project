import React from "react";

import apiUrl from "../fetchAPI";

class ManageSalesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };

    this.fetchItems = this.fetchItems.bind(this);
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems() {
    fetch(apiUrl + "/items")
      .then(response => response.json())
      .then(data => {
        this.setState({ items: data });
      });
  }

  setSale(itemId, saleAmount) {
    fetch(apiUrl + "/manager/setSale", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        itemId: itemId,
        saleAmount: saleAmount
      })
    }).then(this.fetchItems);
  }

  removeSale(itemId) {
    fetch(apiUrl + "/manager/removeSale", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        itemId: itemId
      })
    }).then(this.fetchItems);
  }

  render() {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });

    const itemRows = [];
    this.state.items.forEach(item => {
      itemRows.push(
        <tr>
          <td>{item.itemName}</td>
          <td>{formatter.format(item.cost)}</td>
          <td>{item.saleAmount * 100}%</td>
          <td>{formatter.format(item.cost * (1 - item.saleAmount))}</td>
          <td>
            <div className="field has-addons">
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="% sale"
                  id={"newSaleAmount" + item.itemId}
                  min="0"
                />
              </div>
              <div className="control">
                <button
                  className="button is-primary"
                  onClick={() =>
                    this.setSale(
                      item.itemId,
                      document.getElementById("newSaleAmount" + item.itemId)
                        .value
                    )
                  }
                >
                  Set Sale
                </button>
              </div>
            </div>
          </td>
          <td>
            <button
              className="button is-danger"
              onClick={() => this.removeSale(item.itemId)}
            >
              Remove Sale
            </button>
          </td>
        </tr>
      );
    });
    return (
      <>
        <div className="level">
          <div className="level-item">
            <p className="title">Manage Promotions</p>
          </div>
        </div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Base Price</th>
              <th>Current Sale</th>
              <th>Current Sale Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{itemRows}</tbody>
        </table>
      </>
    );
  }
}

export default ManageSalesPage;
