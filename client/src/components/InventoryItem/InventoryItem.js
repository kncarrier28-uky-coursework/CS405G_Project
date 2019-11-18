import React from "react";

{/* This should be an inventory item which has a button for add to cart or remove
from cart so long as the item is not already part of an order. */}
export class InventoryItem extends React.Component {
  render() {
    return (
      <div class="box">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
              <strong>Item name to be inserted here</strong>
              <br></br>
              Item description to be inserted here.
              </p>
            </div>

            {/* isOrder needs to be defined */}
            if (isOrder == False) {
              {AddRemoveButton}
            }
          </div>
        </article>
      </div>
    );
  }
}
