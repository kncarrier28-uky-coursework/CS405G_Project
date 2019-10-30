import React from "react";
import { Field, Control, Label, Input } from "react-bulma-components";

export class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="is-size-4">Register</p>
        <br />
        <div className="field">
          <div className="control">
            <label className="label">Username</label>
            <input type="text" className="input" placeholder="Username" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Password</label>
            <input type="password" className="input" placeholder="Password" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Confirm Password</label>
            <input type="password" className="input" placeholder="Password" />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-primary" onClick={this.props.onSubmit}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}
