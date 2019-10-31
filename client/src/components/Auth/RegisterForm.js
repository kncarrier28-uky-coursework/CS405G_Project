import React from "react";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", passwordConfirm: "" };

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

  handleSubmit(event) {
    if (this.state.password != this.state.passwordConfirm) {
      console.log("Passwords must match!");
    } else {
      var hashedPass = "";
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.state.password, salt, (err, hash) => {
          hashedPass = hash;
        });
      });
      fetch("http://knca244.cs.uky.edu:3010/auth/register", {
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
  }

  render() {
    return (
      <form>
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
            <input
              type="submit"
              className="button is-primary"
              value="Register"
            />
          </div>
        </div>
      </form>
    );
  }
}
