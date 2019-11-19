import React from "react";
import { Redirect } from "react-router-dom";
import { Columns, Box } from "react-bulma-components";

import { LoginForm, RegisterForm } from "../components/Auth";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Columns>
        <Columns.Column>
          <Box>
            <LoginForm handleLogin={this.props.handleLogin} />
          </Box>
        </Columns.Column>
        <Columns.Column>
          <Box>
            <RegisterForm handleRegister={this.props.handleRegister} />
          </Box>
        </Columns.Column>
      </Columns>
    );
  }
}
