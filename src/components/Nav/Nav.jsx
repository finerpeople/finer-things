import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import "./Nav.scss";

class Nav extends Component {
  render() {
    const { pathname } = this.props.location;

    const navBarStyle =
      pathname === "/" || pathname === "/book" || pathname === "/club"
        ? "navBarNone"
        : "navBar";
    const title =
      pathname === "/"
        ? "WELCOME!"
        : pathname === "/my-library"
        ? "My Library"
        : pathname === "/my-club"
        ? "My Clubs"
        : pathname === "/browse"
        ? "Book Store"
        : pathname === "/friend"
        ? "My Friends"
        : pathname === "/setting"
        ? "Settings"
        : null;

    return (
      <div>
        <div className="upperDiv">
          <div className="logo">
            <p>The Finer Things</p>
          </div>
          <div className="title">
            <p>{title}</p>
          </div>
          <div className="welcome">
            <p>Hi, Oscar!</p>
          </div>
        </div>
        <div className={navBarStyle}>
          <div className="icon">
            <Link to="/my-library" style={{ textDecoration: "none" }}>
              <div className="nav-button">
                <i className="fas fa-book-open" />
                <p className="iconText">My Library</p>
              </div>
            </Link>
          </div>
          <div className="icon">
            <Link to="/my-club" style={{ textDecoration: "none" }}>
              <div className="nav-button">
                <i className="fas fa-book-reader" />
                <p className="iconText">My Clubs</p>
              </div>
            </Link>
          </div>
          <div className="icon">
            <Link to="/friend" style={{ textDecoration: "none" }}>
              <div className="nav-button">
                <i className="fas fa-user-friends" />
                <p className="iconText">My Friends</p>
              </div>
            </Link>
          </div>
          <div className="icon">
            <Link to="/browse" style={{ textDecoration: "none" }}>
              <div className="nav-button">
                <i className="fas fa-search" />
                <p className="iconText">Browse Books</p>
              </div>
            </Link>
          </div>
          <div className="settingsCog">
            <Link to="/setting" style={{ textDecoration: "none" }}>
              <div className="nav-setting-button">
                <i className="fas fa-cog" />
                <p className="iconText">Settings</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Nav);
