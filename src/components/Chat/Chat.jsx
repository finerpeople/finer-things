import React, { Component } from "react";
import axios from "axios";
import "./Chat.scss";

export default class Chat extends Component {
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
    return <div />;
  }
}
