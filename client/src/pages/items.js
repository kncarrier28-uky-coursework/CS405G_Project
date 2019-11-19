import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { ItemList } from "../components/Items";
import { Item } from "../components/Items";

class ItemsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let match = this.props.match;
    return (
      <Switch>
        <Route path={`${match.url}/:itemId`}>
          <Item id={match.params.itemId} />
        </Route>
        <Route path={match.url}>
          <ItemList />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(ItemsPage);
