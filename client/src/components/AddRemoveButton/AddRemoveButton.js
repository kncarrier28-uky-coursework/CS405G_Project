import React from "react";

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
