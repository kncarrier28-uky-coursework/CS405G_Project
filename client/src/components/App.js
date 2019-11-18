import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section } from "react-bulma-components";
import { Switch, Route, Redirect } from "react-router-dom";

import { NavMenu } from "./NavMenu";

import { LoginPage, CartPage, ItemsPage } from "../pages";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true
    };
  }

  render() {
    return (
      <Section>
        <NavMenu />
        <Switch>
          <Route path="/login">
            {this.state.isAuthenticated ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route path="/items">
            {this.state.isAuthenticated ? (
              <ItemsPage />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/cart">
            {this.state.isAuthenticated ? (
              <CartPage />
            ) : (
              <Redirect to="/login" />
            )}
            <CartPage />
          </Route>
          <Route path="/">
            {this.state.isAuthenticated ? (
              <Redirect to="/items" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </Section>
    );
  }
}
