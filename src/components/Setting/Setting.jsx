import React, { Component } from "react";
import axios from "axios";
import "./Setting.scss";
import { TextField } from "@material-ui/core";
// import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: "",
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
  }
  deleteAccount(id) {
    axios
      .delete(`/api/deleteAccount/${id}`)
      .then
      //link to home page?
      ();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="mainContainer">
        <div className="profilePicContainer">
          <img
            className='profileImg'
            src="https://vignette.wikia.nocookie.net/theoffice/images/2/25/Oscar_Martinez.jpg/revision/latest/scale-to-width-down/2000?cb=20170701085818"
            alt="Oscar"
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
          <TextField
            type="text"
            placeholder="Email address"
            onchange={e => this.setState({ email: e.target.value })}
          />
          <TextField
            type="text"
            placeholder="Password"
            onchange={e => this.setState({ password: e.target.value })}
          />
          <br />
          <div classname="editBtns">
            <span className="makeChangesText">Want to make changes?</span>
            <i className="fas fa-pen fa-md" />
          </div>
          <div>
            <Button variant="contained" className={classes.button}>
              Save
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => this.deleteAccount()}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Setting);
