import React from "react";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", passwordConfirm: "" };

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

  handleClick(event) {
    if (this.state.password !== this.state.passwordConfirm) {
      console.log("Passwords must match!");
    } else {
      this.props.handleRegister(this.state.username, this.state.password);
    }
  }

  render() {
    return (
      <div>
        <p className="is-size-4">Register</p>
        <br />
        <div className="field">
          <div className="control">
            <label className="label">Username</label>
            <input
              name="username"
              type="text"
              className="input"
              placeholder="Username"
              onChange={this.handleChange}
              value={this.state.username}
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
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.password}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Confirm Password</label>
            <input
              name="passwordConfirm"
              type="password"
              className="input"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.state.passwordConfirm}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" onClick={this.handleClick}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}
