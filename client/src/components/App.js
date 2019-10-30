import React from "react";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Section, Columns, Box } from "react-bulma-components";

import { NavMenu } from "./NavMenu";
import { LoginForm, RegisterForm } from "./Auth";

function App() {
  return (
    <Section>
      <NavMenu />
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
    </Section>
  );
}

export default App;
