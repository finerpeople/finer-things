import React, { Component } from 'react'
import axios from 'axios'
import './Friend.scss'

export default class Friend extends Component {
  componentDidMount = async () => {
    this.getSession()
  };

  getSession = async () => {
    const res = await axios.get("/api/session")
      if (!res.data.loggedIn) {
        this.props.history.push("/");
      }
  }

  render() {
    return (
      <div >
        
      </div>
    )
  }
}
