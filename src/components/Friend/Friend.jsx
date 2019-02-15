import React, { Component } from "react";
import axios from "axios";
import "./Friend.scss";

export default class Friend extends Component {
  componentDidMount = async () => {
    this.getSession();
  };

  getSession = async () => {
    const res = await axios.get("/api/session");
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div id="friend">
        <div id="friend-header">
          <input className="friend-header-input" type="text" placeholder='Search'/>
          <div className='friend-header-btn'>
            <i className="fas fa-search" />
          </div>
        </div>
      </div>
    );
  }
}
