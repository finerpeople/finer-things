import React, { Component } from "react";
import axios from 'axios'
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
    })
  }

  createUser = async () => {
    const {firstName, lastName, userEmail, password} = this.state
    const res = await axios.post('/api/register', {firstName, lastName, userEmail, password})
    if(res.data.loggedIn) {
      this.props.history.push('/my-library')
    }
  }

  render() {
    const {userEmail, password, firstName, lastName, login} = this.state
    console.log(userEmail, password, firstName, lastName)

    return (
      <div id="auth-main">
        <div id="auth-bg-icons">
          <div className="auth-left-bg" />
          <div className="auth-right-bg" />
        </div>
        <p>The Finer Things</p>
        /////////////////////////////////////////////////////////////////////////////
        <div id={!login ? "login-none" : "login-container"}>
          <div id="login-row">
            <input type="email" placeholder="Email" onChange={e => this.handleChange('userEmail', e)}/>
          </div>
          <div id="login-row">
            <input type="password" placeholder="Password"  onChange={e => this.handleChange('password', e)}/>
          </div>
          <div id="login-row">
            <button>Login</button>
            <p>
              Don't have an account? <button onClick={e => this.setState({login: false})}>Register now!</button>
            </p>
          </div>
        </div>
        /////////////////////////////////////////////////////////////////////////////
        <div id={login ? "register-none" : "register-container"}>
          <div id="register-row">
            <input type="text" placeholder="First Name"  onChange={e => this.handleChange('firstName', e)}/>
          </div>
          <div id="register-row">
            <input type="text" placeholder="Last Name"  onChange={e => this.handleChange('lastName', e)}/>
          </div>
          <div id="register-row">
            <input type="email" placeholder="Email"  onChange={e => this.handleChange('userEmail', e)}/>
          </div>
          <div id="register-row">
            <input type="password" placeholder="Password"  onChange={e => this.handleChange('password', e)}/>
          </div>
          <div id="register-row">
            <button onClick={() => this.createUser()}>Create Account</button>
          </div>
        </div>
      </div>
    );
  }
}
