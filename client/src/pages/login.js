import React from "react";
import { Columns, Box } from "react-bulma-components";

import { LoginForm, RegisterForm } from "../components/Auth";

class LoginPage extends React.Component {
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

export default LoginPage;
