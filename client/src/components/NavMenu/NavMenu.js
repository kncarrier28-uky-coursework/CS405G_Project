import React from "react";
import { Navbar, Heading } from "react-bulma-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export class NavMenu extends React.Component {
  render() {
    return (
      <Navbar fixed={"top"} className="is-primary">
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <Heading size={3}>ToyzRUs</Heading>
          </Navbar.Item>
          <Navbar.Burger className="has-text-dark has-text-weight-semibold" />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item
              href="/items"
              className="has-text-dark has-text-weight-semibold"
            >
              Home
            </Navbar.Item>
          </Navbar.Container>
          <div className="navbar-end">
            <Navbar.Item
              href="/cart"
              className="has-text-dark has-text-weight-semibold"
            >
              <p>
                Cart <FontAwesomeIcon icon={faShoppingCart} />
              </p>
            </Navbar.Item>
          </div>
        </Navbar.Menu>
      </Navbar>
    );
  }
}
