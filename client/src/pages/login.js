import React from "react";
import { Redirect } from "react-router-dom";
import { Columns, Box } from "react-bulma-components";

import { LoginForm, RegisterForm } from "../components/Auth";

export class LoginPage extends React.Component {
  render() {
    return (
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
}
