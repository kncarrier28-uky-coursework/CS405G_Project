import React from "react";
const bcrypt = require("bcrypt");

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    var hashedPass = "";
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.state.password, salt, (err, hash) => {
        hashedPass = hash;
      });
    });
    fetch("http://knca244.cs.uky.edu:3010/auth/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userName: this.state.username,
        password: hashedPass
      })
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => console.log(error));
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
            <button className="button is-primary" onClick={this.handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }
}
