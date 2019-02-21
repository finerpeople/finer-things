import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./Setting.scss";

export default class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      image: "",
      firstName: "",
      firstNameEdit: "",
      lastName: "",
      lastNameEdit: "",
      email: "",
      emailEdit: "",
      password: "",
      // passwordEdit: "",
      profilePic: "",
      // summary: "",
      // summaryEdit: "",
      status: "",
      modalToggle: false
    };
  }

  componentDidMount = async () => {
    const session = await this.getSession();
    const { id } = session;
    const res = await axios.get(`/api/userData/${id}`);
    const {
      user_id,
      first_name,
      last_name,
      email,
      hash,
      profile_pic,
      summary,
      user_status
    } = res.data;
    this.setState({
      id: user_id,
      firstName: first_name,
      lastName: last_name,
      email,
      // password: hash,
      profilePic: profile_pic,
      summary,
      status: user_status
    });
  };

  getSession = async () => {
    const res = await axios.get("/api/session");
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
    return res.data;
  };

  deleteAccount = async id => {
    const res = await axios.put(`/api/updateAccountStatus/${id}`);
    this.props.history.push("/");
  };
  editProfile = async () => {
    const { id, emailEdit, firstNameEdit, lastNameEdit } = this.state;
    let email, firstName, lastName;
    emailEdit === "" ? (email = this.state.email) : (email = emailEdit);
    firstNameEdit === ""
      ? (firstName = this.state.firstName)
      : (firstName = firstNameEdit);
    lastNameEdit === ""
      ? (lastName = this.state.lastName)
      : (lastName = lastNameEdit);
    // passwordEdit === '' ? password=this.state.password : email=passwordEdit
    const res = await axios.put("/api/edit-profile", {
      id,
      firstName,
      lastName,
      email
    });
    swal({
      title: "Success!",
      text: "",
      icon: "success"
    });
    this.setState({
      firstName: firstName,
      lastName: lastName,
      email: email
      // password:
    });
  };
  editPassword = async () => {
    const { id, password } = this.state;
    const res = await axios.put("/api/edit-password", {
      id,
      password
    });
    swal({
      title: "Success!",
      text: "",
      icon: "success"
    });
    // console.log(password)
    this.setState({
      password: password
    });
  };

  render() {
    return (
      <div id="settings-entireContainer">
        <div id="settings-mainContainer">
          <div id="settings-profileContainer">
            <div className="colorContainer">
              <div id="settings-picContainer">
                <img
                  id="settings-profileImg"
                  src={this.state.profilePic}
                  alt="user"
                />
                <div className="editProfileBtns">
                  <div>
                    <i id="settings" className="fas fa-plus" />
                  </div>
                  <div>
                    <i id="settings" className="fas fa-user-edit fa-lg" />
                  </div>
                  <div>
                    <i id="settings" className="far fa-trash-alt fa-lg" />
                  </div>
                </div>
              </div>
              <div className="settings-AboutWrapper">
                <div className="settings-aboutMe">
                  <br />
                  {/* <div id="settings-summary">
                    <p>About Me: </p>
                    {this.state.summary}
                  </div> */}
                  <br />
                  <p id="settings-email">
                    Name: {this.state.firstName} {this.state.lastName}
                  </p>
                  <br />
                  <p id="settings-email">Email: {this.state.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div id="settings-editProfileContainer">
            <div id="settings-inputFields">
              <p id="settings-greeting">Make any profile changes here</p>
              <form action="" id="settings-form">
                <div
                  id="settings-individualInput"
                  style={{ fontSize: "0.9em" }}
                >
                  {/* About Me:{" "}
                  <textarea
                    name="about"
                    id="aboutMeText"
                    cols="45"
                    rows="3"
                    onChange={e => this.setState({ summary: e.target.value })}
                  /> */}
                </div>
                <br />
                <div
                  id="settings-individualInput"
                  style={{ fontSize: "0.9em" }}
                >
                  First Name:
                  <input
                    type="text"
                    placeholder={this.state.firstName}
                    id="editInputs"
                    onChange={e =>
                      this.setState({ firstNameEdit: e.target.value })
                    }
                  />
                </div>
                <br />
                <div
                  id="settings-individualInput"
                  style={{ fontSize: "0.9em" }}
                >
                  Last Name:
                  <input
                    type="text"
                    placeholder={this.state.lastName}
                    id="editInputs"
                    onChange={e =>
                      this.setState({ lastNameEdit: e.target.value })
                    }
                  />
                </div>
                <br />
                <div
                  id="settings-individualInput"
                  style={{ fontSize: "0.9em" }}
                >
                  Email:
                  <input
                    type="text"
                    placeholder={this.state.email}
                    id="editInputs"
                    onChange={e => this.setState({ emailEdit: e.target.value })}
                  />
                </div>
                <br />

                {this.state.modalToggle === true ? (
                  <div id="settings-modalWrapper">
                    <div>
                      <div
                        id="settings-passwordInput"
                        style={{ fontSize: "0.9em" }}
                      >
                        New Password:
                        <input
                          type="password"
                          id="passwordEdit"
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                        />
                      </div>

                      <div id="modalButtons">
                        <button
                          id="settings-btns"
                          onClick={() => this.editPassword(this.state.id)}
                        >
                          Save
                        </button>
                        <button
                          id="settings-btns"
                          onClick={() => this.setState({ modalToggle: false })}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                <div id="settings-mainBtns">
                  <div>
                    <button
                      id="settings-btns"
                      type="button"
                      onClick={() => this.editProfile(this.state.id)}
                    >
                      Save Changes
                    </button>
                  </div>
                  <div>
                    <button
                      id="settings-btns"
                      type="button"
                      onClick={() => this.deleteAccount(this.state.id)}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </form>
              <div id="settings-changePassword">
                <button
                  id="settings-btns"
                  type="button"
                  onClick={() => this.setState({ modalToggle: true })}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
