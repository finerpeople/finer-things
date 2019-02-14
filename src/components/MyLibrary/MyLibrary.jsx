import React, { Component } from "react";
import axios from "axios";
// import Book from '../Book/Book'
import "./MyLibrary.scss";

export default class MyLibrary extends Component {
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
    return <div>{/* <Book /> */}</div>;
  }
}
