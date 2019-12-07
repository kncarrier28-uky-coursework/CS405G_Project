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
      userId: props.userId || null,
      userName: null,
      userType: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      if (this.props.userId !== null)
        this.setState({ userId: this.props.userId }, this.fetchUser);
      else this.setState({ userId: this.props.userId });
    }
  }

  fetchUser() {
    fetch(apiUrl + `/users/${this.state.userId}`)
      .then(res => res.json())
      .then(data => {
        this.setState({ userName: data.uName, userType: data.type });
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
              {this.state.userType === "staff" ||
              this.state.userType === "manager" ? (
                <>
                  <Navbar.Item
                    renderAs="div"
                    className="has-text-weight-semibold"
                  >
                    <Link to="/staff/orders" className="has-text-light">
                      Manage Orders
                    </Link>
                  </Navbar.Item>
                  <Navbar.Item
                    renderAs="div"
                    className="has-text-weight-semibold"
                  >
                    <Link to="/staff/items" className="has-text-light">
                      Manage Toys
                    </Link>
                  </Navbar.Item>
                </>
              ) : (
                <div></div>
              )}
              {this.state.userType === "manager" ? (
                <>
                  <Navbar.Item
                    renderAs="div"
                    className="has-text-weight-semibold"
                  >
                    <Link to="/manager/users" className="has-text-light">
                      Manage Users
                    </Link>
                  </Navbar.Item>
                  <Navbar.Item
                    renderAs="div"
                    className="has-text-weight-semibold"
                  >
                    <Link to="/manager/sales" className="has-text-light">
                      Manage Promotions
                    </Link>
                  </Navbar.Item>
                  <Navbar.Item
                    renderAs="div"
                    className="has-text-weight-semibold"
                  >
                    <Link to="/manager/data" className="has-text-light">
                      Sales Data
                    </Link>
                  </Navbar.Item>
                </>
              ) : (
                <div></div>
              )}
            </Navbar.Container>
            <div className="navbar-end">
              <Navbar.Item dropdown hoverable href="#">
                <Navbar.Link
                  arrowless={false}
                  className="has-text-weight-semibold"
                >
                  {this.state.userName}
                </Navbar.Link>
                <Navbar.Dropdown>
                  <Navbar.Item className="has-text-weight-semibold">
                    <Link to="/orders" className="has-text-dark">
                      My Orders
                    </Link>
                  </Navbar.Item>
                  <Navbar.Item
                    className="has-text-weight-semibold"
                    onClick={this.props.handleLogout}
                  >
                    Logout
                  </Navbar.Item>
                </Navbar.Dropdown>
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
