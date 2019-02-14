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
      status: "",
      emailEditable: false,
      editEmailDone: false
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
  saveProfileChanges() {
    const { email } = this.state;
    axios
      .put("/api/edit-profile", { email: email })
      .then(this.setState({ emailEditable: false }));
  }
  edit = () => {
    if (!this.state.editEmailDone) {
      this.setState({ emailEditable: true, editEmailDone: true });
    } else {
      this.setState({ emailEditable: false, editEmailDone: false });
    }
  };

  render() {
    return (
      <div className="mainContainer">
        <div className="profilePicContainer">
          <img
            className="profileImg"
            src="https://vignette.wikia.nocookie.net/theoffice/images/2/25/Oscar_Martinez.jpg/revision/latest/scale-to-width-down/2000?cb=20170701085818"
            alt="Oscar"
            //TODO render this.state.image here
          />
          <div className="editProfileBtns">
            <div>
              <i className="fas fa-user-edit fa-lg" />
            </div>
            <div className="deleteBtn">
              <i className="far fa-trash-alt fa-lg" />
            </div>
          </div>
        </div>

        <div className="editTextContainer">
          <p className="summary">
            I am an Accountant by day and an avid reader by night. When not
            crunching numbers, I enjoy a good history or nonfiction book. I
            despise Anne Geddes.
          </p>
          <input
            type="text"
            placeholder="Email address"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <br />
          <div className="editBtns">
            <span className="makeChangesText">Want to make changes?</span>
            <i className="fas fa-pen fa-md" />
          </div>
          <div className="editTextContainer">
            {this.state.emailEditable ? (
              <div>
                <input
                  type="text"
                  value={this.state.email}
                  onChange={e => {
                    this.handleChange("email", e.target.value);
                  }}
                />
              </div>
            ) : (
              <span>{this.state.email}</span>
            )}
            <div>
              <br />
              <button type="button" id="settings-editBtn">
                {this.state.editEmailDone ? "Cancel" : "Edit"}
              </button>
              <hr />
              <div>
                {!this.state.editEmailDone ? null : (
                  <button
                    type="button"
                    id="settings-Btns"
                    onClick={() => this.saveProfileChanges()}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
            <br />
            <input
              value={this.state.password}
              className="inputFields"
              type="text"
              placeholder="Password"
              onchange={e => this.setState({ password: e.target.value })}
            />
            <br />
            <div classname="editBtns">
              <span className="makeChangesText">Want to make changes?</span>
              <i className="fas fa-pen fa-md" />
            </div>
            <div className="saveDeleteBtns">
              <button type="button" id="settings-Btns">
                Save
              </button>
              <button
                type="button"
                id="settings-Btns"
                onClick={() => this.deleteAccount(this.state.id)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
