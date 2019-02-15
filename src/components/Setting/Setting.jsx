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
  editProfile = () => {
    const { email } = this.state;
    axios
      .put("/api/edit-profile", { email: email })
      .then(this.setState({ emailEditable: false }));
  };
  edit = () => {
    if (!this.state.editEmailDone) {
      this.setState({ emailEditable: true, editEmailDone: true });
    } else {
      this.setState({ emailEditable: false, editEmailDone: false });
    }
  };

  render() {
    return (
      <div id="settings-mainContainer">
        <div id="settings-profileContainer">
          <div>
            <img
              id="settings-profileImg"
              src="https://vignette.wikia.nocookie.net/theoffice/images/2/25/Oscar_Martinez.jpg/revision/latest/scale-to-width-down/2000?cb=20170701085818"
              alt="Oscar"
            />
            <div className="editProfileBtns">
              <div>
                <i className="fas fa-plus" />
              </div>
              <div>
                <i className="fas fa-user-edit fa-lg" />
              </div>
              <div>
                <i className="far fa-trash-alt fa-lg" />
              </div>
            </div>
            <div className="settings-AboutWrapper">
            <div className="settings-aboutMe">
              <h4 id="settingsSumTitle">About Me</h4>
              <br/>
              <p id="settings-summary">
                I am an Accountant by day and an avid reader by night. When not
                crunching numbers, I enjoy a good history or nonfiction book. I
                despise Anne Geddes photography. 
              </p>
              <br/>
              <p id="settings-email">
                Name: {this.state.firstName} {this.state.lastName}
              </p>
              <br/>
              <p id="settings-email">Email: {this.state.email}</p>
            </div>
            </div>
          </div>
        </div>

        <div id="settings-editProfileContainer">
          <div id="settings-inputFields">
            <p id="settings-greeting">
              Hi (name), you can edit your profile here
            </p>
            <form action="">
              <div>
                About Me:{" "}
                <textarea name="about" id="aboutMeText" cols="50" rows="3" />
              </div>
              <br />
              <div>
                First Name: <input type="text" id="editInputs" />
              </div>
              <br />
              <div>
                Last Name: <input type="text" id="editInputs" />
              </div>
              <br />
              <div>
                Email: <input type="text" id="editInputs" />
              </div>
              <br />
              Password: <input type="text" id="editInputs" />
              <div id="settings-mainBtns">
                <button id="settings-btns" type="button">Save Changes</button>
                <button
                id="settings-btns" 
                  type="button"
                  onClick={() => this.deleteAccount(this.state.id)}
                >
                  Delete Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
