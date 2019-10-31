import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section, Columns, Box } from "react-bulma-components";

import { NavMenu } from "./NavMenu";
import { LoginForm, RegisterForm } from "./Auth";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let view;

    if (isLoggedIn) {
      view = <div>Logged In</div>;
    } else {
      view = (
        <Columns>
          <Columns.Column>
            <Box>
              <LoginForm />
            </Box>
          </Columns.Column>
          <Columns.Column>
            <Box>
              <RegisterForm />
            </Box>
          </Columns.Column>
        </Columns>
      );
    }

    return (
      <Section>
        <NavMenu />
        {view}
      </Section>
    );
  }
}
