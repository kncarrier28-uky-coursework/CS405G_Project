import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section } from "react-bulma-components";
import { Switch, Route, Redirect } from "react-router-dom";

import apiUrl from "../fetchAPI";

import { NavMenu } from "./NavMenu";

import ItemsPage from "../pages/items";
import CartPage from "../pages/cart";
import LoginPage from "../pages/login";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userId: null
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin(username, password) {
    fetch(apiUrl + "/auth/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userName: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        data.error
          ? console.log(data.error)
          : this.setState({ isAuthenticated: true, userId: data.userId });
      })
      .catch(error => console.log(error));
  }

  handleRegister(username, password) {
    fetch(apiUrl + "/auth/register", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userName: username,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        data.error
          ? console.log(data.error)
          : this.setState({ isAuthenticated: true, userId: data.userId });
      })
      .catch(error => console.log(error));
  }

  handleLogout() {
    this.setState({ isAuthenticated: false, userId: null });
  }

  render() {
    return (
      <Section>
        <NavMenu userId={this.state.userId} handleLogout={this.handleLogout} />
        <Switch>
          <Route path="/login">
            {this.state.isAuthenticated ? (
              <Redirect to="/" />
            ) : (
              <LoginPage
                handleLogin={this.handleLogin}
                handleRegister={this.handleRegister}
              />
            )}
          </Route>
          <Route path="/items">
            {this.state.isAuthenticated ? (
              <ItemsPage userId={this.state.userId} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/cart">
            {this.state.isAuthenticated ? (
              <CartPage userId={this.state.userId} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/orders">
            {this.state.isAuthenticated ? (
              <CartPage userId={this.state.userId} />
            ) : (
              <Redirect to="/login" />
            )}
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
