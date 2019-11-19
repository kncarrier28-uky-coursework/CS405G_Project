import React from "react";
import { Navbar, Heading } from "react-bulma-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId != prevProps.userId) {
      this.setState({ userId: this.props.userId });
    }
  }

  render() {
    return (
      <Navbar fixed={"top"} className="is-primary">
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <Heading size={3}>ToyzRUs</Heading>
          </Navbar.Item>
          <Navbar.Burger className="has-text-dark has-text-weight-semibold" />
        </Navbar.Brand>
        {this.state.userId ? (
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
              <Navbar.Item className="has-text-dark has-text-weight-semibold">
                {this.state.userId}
              </Navbar.Item>
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
        ) : (
          <div></div>
        )}
      </Navbar>
    );
  }
}
