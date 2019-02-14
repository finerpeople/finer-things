import React, { Component } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./Auth.scss";

export default class Auth extends Component {
  state = {
    userEmail: "",
    password: "",
    firstName: "",
    lastName: "",
    login: true
  };

  handleChange = (prop, e) => {
    this.setState({
      [prop]: e.target.value
    });
  };

  login = async () => {
    const { userEmail, password } = this.state;
    try {
      const res = await axios.post("/api/login", { userEmail, password });
      if (res.data.loggedIn) {
        this.props.history.push("/my-library");
      }
      if (res.data.message === "Account suspended") {
        Swal.fire({
          title: 'Wha-oohh!',
          text: "It looks like your account was deleted.  Would you like to restore it?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, restore it!'
        }).then((result) => {
          console.log(result)
          if (result.value) {
            Swal.fire(
              'Restored!',
              'Your account has been restored.',
              'success'
            )
          }
        })
      }
    } catch {
      Swal.fire({
        type: "error",
        title: "Oops...",
        text: "Inccorect Email or Password. Please try again.",
        footer: "<a href>Why do I have this issue?</a>"
      });
    }
  };

  register = async () => {
    const { firstName, lastName, userEmail, password } = this.state;
    const res = await axios.post("/api/register", {
      firstName,
      lastName,
      userEmail,
      password
    });
    if (res.data.loggedIn) {
      this.props.history.push("/my-library");
    }
  };

  enterKey = (prop, e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      if (prop === "login") {
        this.login();
      }
      if (prop === "register") {
        this.register();
      }
    }
  };

  render() {
    const { userEmail, password, firstName, lastName, login } = this.state;

    return (
      <div id="auth-main">
        <div id="auth-bg-icons">
          <div className="auth-left-bg" />
          <div className="auth-right-bg" />
        </div>
        <p>The Finer Things</p>
        <div id={!login ? "login-none" : "login-container"}>
          <div id="login-row">
            <input
              type="email"
              placeholder="Email"
              onChange={e => this.handleChange("userEmail", e)}
            />
          </div>
          <div id="login-row">
            <input
              type="password"
              placeholder="Password"
              onChange={e => this.handleChange("password", e)}
              onKeyPress={e => this.enterKey("login", e)}
            />
          </div>
          <div id="login-row">
            <button onClick={() => this.login()}>Login</button>
            <p>
              Don't have an account?{" "}
              <button onClick={e => this.setState({ login: false })}>
                Register now!
              </button>
            </p>
          </div>
        </div>
        <div id={login ? "register-none" : "register-container"}>
          <div id="register-row">
            <input
              type="text"
              placeholder="First Name"
              onChange={e => this.handleChange("firstName", e)}
            />
          </div>
          <div id="register-row">
            <input
              type="text"
              placeholder="Last Name"
              onChange={e => this.handleChange("lastName", e)}
            />
          </div>
          <div id="register-row">
            <input
              type="email"
              placeholder="Email"
              onChange={e => this.handleChange("userEmail", e)}
            />
          </div>
          <div id="register-row">
            <input
              type="password"
              placeholder="Password"
              onChange={e => this.handleChange("password", e)}
              onKeyPress={e => this.enterKey("register", e)}
            />
          </div>
          <div id="register-row">
            <button onClick={() => this.register()}>Create Account</button>
          </div>
        </div>
      </div>
    );
  }
}
