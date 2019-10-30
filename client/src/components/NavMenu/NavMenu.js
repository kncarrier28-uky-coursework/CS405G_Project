import React from "react";
import { Navbar, Heading } from "react-bulma-components";

function NavMenu() {
  return (
    <Navbar fixed={"top"}>
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <Heading size={3}>ToyzRUs</Heading>
        </Navbar.Item>
      </Navbar.Brand>
    </Navbar>
  );
}

export default NavMenu;
