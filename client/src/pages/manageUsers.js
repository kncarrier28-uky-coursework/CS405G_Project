import React from "react";

import apiUrl from "../fetchAPI";

class ManageUsersPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      displayUsers: []
    };

    this.fetchUsers = this.fetchUsers.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch(apiUrl + "/users")
      .then(res => res.json())
      .then(users => this.setState({ users: users, displayUsers: users }));
  }

  filterUsers(type) {}

  setType(userId, type) {
    fetch(apiUrl + "/users/setType", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({
        userId: userId,
        type: type
      })
    }).then(this.fetchUsers);
  }

  render() {
    const userInfo = [];
    this.state.displayUsers.forEach(user => {
      userInfo.push(
        <tr>
          <td>{user.uName}</td>
          <td>
            {String(user.type)
              .charAt(0)
              .toUpperCase() + String(user.type).substring(1)}
          </td>
          <td>
            <div className="field has-addons">
              <div className="control">
                <div className="select">
                  <select id={"newType" + user.uId}>
                    <option disabled selected>
                      Choose User Type
                    </option>
                    <option value="customer">Customer</option>
                    <option value="staff">Staff</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
              <div className="control">
                <button
                  className={"button is-primary"}
                  onClick={() =>
                    this.setType(
                      user.uId,
                      document.getElementById("newType" + user.uId).value
                    )
                  }
                >
                  Set User Type
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <>
        <div className="level">
          <div className="level-item">
            <p className="title">Manage Users</p>
          </div>
        </div>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Username</th>
              <th>User type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{userInfo}</tbody>
        </table>
      </>
    );
  }
}

export default ManageUsersPage;
