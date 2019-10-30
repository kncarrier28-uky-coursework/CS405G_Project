import React from "react";
import { Navbar, Heading } from "react-bulma-components";

export class NavMenu extends React.Component {
  render() {
    return (
      <Navbar fixed={"top"} className="is-primary">
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <Heading size={3}>ToyzRUs</Heading>
          </Navbar.Item>
        </Navbar.Brand>
      </Navbar>
    );
  }
}
