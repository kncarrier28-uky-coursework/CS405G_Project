import React from "react";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleClick() {
    this.props.handleLogin(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <p className="is-size-4">Login</p>
        <br />
        <div className="field">
          <div className="control">
            <label className="label">Username</label>
            <input
              onChange={this.handleChange}
              name="username"
              type="text"
              value={this.state.username}
              className="input"
              placeholder="Username"
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" onClick={this.handleClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
