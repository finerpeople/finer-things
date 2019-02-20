import React, { Component } from "react";
import axios from "axios";
import "./Setting.scss";

export default class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profilePic: "",
      summary: "",
      status: ""
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
  editProfile = async id => {
    const { summary, email, firstName, lastName, password } = this.state;
    const res = await axios.put(`/api/edit-profile/${id}`, {
      // summary: summary,
      // // first_name: firstName,
      // // last_name: lastName,
      // firstName: firstName,
      // lastName: lastName,
      // email: email,
      // hash: password
      summary,
      firstName,
      lastName,
      email,
      password
    })
    this.setState({
      firstName: firstName,
      lastName: lastName,
      summary: summary,
      email: email,
      // password: 
    })
    console.log(this.state.lastName);
    console.log(this.state.email);
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
                  alt="pic of me"
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
                  <div id="settings-summary">
                    <p>About Me: </p>
                    {this.state.summary}
                  </div>
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
                  About Me:{" "}
                  <textarea
                    name="about"
                    id="aboutMeText"
                    cols="45"
                    rows="3"
                    onChange={e => this.setState({ summary: e.target.value })}
                  />
                </div>
                <br />
                <div
                  id="settings-individualInput"
                  style={{ fontSize: "0.9em" }}
                >
                  First Name:
                  <input
                    type="text"
                    id="editInputs"
                    onChange={e => this.setState({ firstName: e.target.value })}
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
                    id="editInputs"
                    onChange={e => this.setState({ lastName: e.target.value })}
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
                    id="editInputs"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </div>
                <br />
                <div
                  id="settings-individualInput"
                  style={{ fontSize: "0.9em" }}
                >
                  Password:
                  <input
                    type="text"
                    id="editInputs"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </div>
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
