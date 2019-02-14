import React, { Component } from "react";
import axios from "axios";
import "./Setting.scss";

export default class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: props.image,
      firstName: "",
      lastName: "",
      email: "",
      password: props.password,
      // email: props.email,
      summary: props.summary,
      editable: false,
      editDone: false
    };
  }
  deleteAccount(id) {
    axios
      .delete(`/api/delete-account/${id}`)
      .then(res => this.props.history.push("/"));
  }
  edit = () => {
    if (!this.state.editDone) {
      this.setState({ editable: true, editDone: true });
    } else {
      this.setState({ editable: false, editDone: false });
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

        <div className="lowerContainer">
          <div>
            <p className="summary">
              I am an Accountant by day and an avid reader by night. When not
              crunching numbers, I enjoy a good history or nonfiction book. I
              despise Anne Geddes photography.
            </p>
          </div>
          {/* render this.state.summary here */}
          <div className="editTextContainer">
            {this.state.editable ? (
              <div>
                <input type="text" value={this.state.email} />
              </div>
            ) : (
              <span>{this.state.email}</span>
            )}
            <div>
              <br />
              <button type="button" id="settings-editBtn">
                {this.state.editDone ? "Cancel" : "Edit"}
              </button>
              <hr />
              <div>
                {!this.state.editDone ? null : (
                  <button type="button" id="settings-Btns">
                    Save
                  </button>
                )}
              </div>
            </div>
            {/* <TextField
            InputProps={{
            classes: {
              input: classes.resize,
            },
          }}
            className="inputFields"
              type="text"
              placeholder="Email address"
              onchange={e => this.setState({ email: e.target.value })}
            /> */}
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
              <button 
                type="button" 
                id="settings-Btns">
                Save
              </button>
              <button
                type="button"
                id="settings-Btns"
                onClick={() => this.deleteAccount()}
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
// export default withStyles(styles)(Setting);
