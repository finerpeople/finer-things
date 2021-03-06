import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Nav.scss";
import logo from "../../The-Finer-Things.png";
import {updateFirstName} from '../../ducks/reducer'

class Nav extends Component {
  state = {
    firstName: ""
  };

  componentDidMount = async () => {
    const res = await axios.get("/api/session");
    this.setState({ firstName: res.data.firstName });
  };

  signout = () => {
    this.props.updateFirstName('')
    axios.get("/api/signout").then(res => {
      this.props.history.push("/");
    });
  };

  render() {
    const { pathname } = this.props.location;
    const {clubName} = this.props

    const navBarStyle =
      pathname === "/" || pathname === "/book" || pathname === "/club"
        ? "navBarNone"
        : "navBar";
    const headerStyle =
      pathname === "/" || pathname === "/book" 
        ? "headerNone"
        : "header";
    const title =
      pathname === "/"
        ? "WELCOME!"
        : pathname === "/my-library"
        ? "My Library"
        : pathname === "/my-clubs"
        ? "My Clubs"
        : pathname.includes("/club/")
        ? clubName
        : pathname === "/browse"
        ? "Book Store"
        : pathname === "/friends"
        ? "My Friends"
        : pathname === "/settings"
        ? "Settings"
        : null;
      
      const name = this.state.firstName ? this.state.firstName : this.props.firstName

    return (
      <div>
        <div className={headerStyle}>
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="title">
            <p>{title}</p>
          </div>
          <div className="welcome">
            <p>{`Hi, ${name}!`}</p>
            <i className="fas fa-sign-out-alt" onClick={() => this.signout()} />
          </div>
        </div>
        <div className={navBarStyle}>
          <div className="icon">
            <Link to="/my-library" style={{ textDecoration: "none" }}>
              <div
                id={pathname === "/my-library" ? "button-current" : ""}
                className="nav-button"
              >
                <i className="fas fa-book-open" />
                <p className="iconText">My Library</p>
              </div>
            </Link>
          </div>
          <div className="icon">
            <Link to="/my-clubs" style={{ textDecoration: "none" }}>
              <div
                id={pathname === "/my-clubs" ? "button-current" : ""}
                className="nav-button"
              >
                <i className="fas fa-book-reader" />
                <p className="iconText">My Clubs</p>
              </div>
            </Link>
          </div>
          <div className="icon">
            <Link to="/friends" style={{ textDecoration: "none" }}>
              <div
                id={pathname === "/friends" ? "button-current" : ""}
                className="nav-button"
              >
                <i className="fas fa-user-friends" />
                <p className="iconText">My Friends</p>
              </div>
            </Link>
          </div>
          <div className="icon">
            <Link to="/browse" style={{ textDecoration: "none" }}>
              <div
                id={pathname === "/browse" ? "button-current" : ""}
                className="nav-button"
              >
                <i className="fas fa-search" />
                <p className="iconText">Browse Books</p>
              </div>
            </Link>
          </div>
          <div className="settingsCog">
            <Link to="/settings" style={{ textDecoration: "none" }}>
              <div
                id={pathname === "/settings" ? "button-current" : ""}
                className="nav-setting-button"
              >
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

const mapStateToProps = reduxState => reduxState;

export default withRouter(connect(mapStateToProps, {updateFirstName})(Nav));
