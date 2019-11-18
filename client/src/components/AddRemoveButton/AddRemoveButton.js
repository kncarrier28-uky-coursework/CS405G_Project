import React from "react";

{/* This button should display different values based on the properties of the
item being displayed. */}
export class AddRemoveButton extends React.Component {
  render() {
    if (inCart == True) {
      return(
        <button class="button">Remove from Cart</button>
      )
    }
    else if (isOrder == False) {
      return (
        <button class="button">Add to Cart</button>
      )
    }
    else {
      return null;
    }
  }
}
