import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import { ItemList } from "../components/Items";

class ItemsPage extends React.Component {
  render() {
    let match = this.props.match;
    return (
      <Switch>
        <Route path={match.url}>
          <ItemList user={this.props.userId} />
        </Route>
      </Switch>
    );
  }
}

export default withRouter(ItemsPage);
