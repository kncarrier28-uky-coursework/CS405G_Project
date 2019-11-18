import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section } from "react-bulma-components";
import { Switch, Route } from "react-router-dom";

import { NavMenu } from "./NavMenu";

import { LoginPage } from "../pages";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Section>
        <NavMenu />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/items">
            <h2>Insert Items Page Here</h2>
          </Route>
          <Route path="/cart">
            <h2>Insert Cart Page Here</h2>
          </Route>
          <Route path="/">
            <h2>Test</h2>
          </Route>
        </Switch>
      </Section>
    );
  }
}
