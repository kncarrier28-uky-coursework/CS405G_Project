import React from "react";
import { Navbar, Heading } from "react-bulma-components";
import { Link } from "react-router-dom";

import apiUrl from "../../fetchAPI";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export class NavMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      userName: null,
      userType: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.setState({ userId: this.props.userId }, this.fetchUser);
    }
  }

  fetchUser() {
    fetch(apiUrl + `/users/${this.state.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ userName: data[0].uName, userType: data[0].type });
      });
  }

  render() {
    return (
      <Navbar fixed={"top"} className="is-dark">
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="/items">
            <Heading size={3} className="has-text-light">
              ToyzRUs
            </Heading>
          </Navbar.Item>
          <Navbar.Burger className="has-text-weight-semibold" />
        </Navbar.Brand>
        {this.state.userId ? (
          <Navbar.Menu>
            <Navbar.Container>
              <Navbar.Item renderAs="div" className="has-text-weight-semibold">
                <Link to="/items" className="has-text-light">
                  Home
                </Link>
              </Navbar.Item>
            </Navbar.Container>
            <div className="navbar-end">
              <Navbar.Item className="has-text-weight-semibold">
                {this.state.userName}
              </Navbar.Item>
              <Navbar.Item renderAs="div" className="has-text-weight-semibold">
                <Link to="/cart" className="has-text-light">
                  Cart <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
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
