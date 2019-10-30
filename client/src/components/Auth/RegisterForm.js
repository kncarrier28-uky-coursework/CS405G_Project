import React from "react";
import { Field, Control, Label, Input } from "react-bulma-components";

export class RegisterForm extends React.Component {
  render() {
    return (
      <div>
        <p class="is-size-4">Register</p>
        <br />
        <div class="field">
          <div class="control">
            <label class="label">Username</label>
            <input type="text" class="input" placeholder="Username" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">Password</label>
            <input type="password" class="input" placeholder="Password" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">Confirm Password</label>
            <input type="password" class="input" placeholder="Password" />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary">Register</button>
          </div>
        </div>
      </div>
    );
  }
}
