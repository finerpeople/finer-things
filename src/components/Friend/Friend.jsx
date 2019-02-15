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
          <div className="app-input-container">
            <input className="app-input" type="text" placeholder="Search" />
          </div>
          <div className="friend-header-btn">
            <i className="fas fa-search" />
          </div>
        </div>
        {/* ///////////////////////////////////////////////////// */}
        <div id='friend-body'>
          <div id="recommend">
            <h4>Recomendations</h4>
          </div>
          <div id="my-friends">
            <h4>Friends</h4>
          </div>
        </div>
      </div>
    );
  }
}
