import React, { Component } from "react";
import axios from "axios";
import "./MiniChat.scss";

export default class MiniChat extends Component {
  state = {
    messages: [],
    messageInput: ''
  };
  componentDidMount = async () => {
    // this.getSession();
  };

  handleChange = (e) => {
    this.setState({messageInput: e.target.value})
  }

  render() {
    const { messages } = this.state;

    const chatDisplay = this.props.display ? "mini-chat-send-msg" : null;

    console.log(this.state.messageInput)
      
    return (
      <div
        style={
          this.props.display
            ? {
                overflow: "hidden",
                bottom: "20px",
                right: "20px",
                height: "30em",
                width: "23em",
                transition: "all .4s"
              }
            : {
                overflow: "hidden",
                bottom: "20px",
                right: "20px",
                height: "0em",
                width: "0em",
                transition: "all .4s"
              }
        }
        id="mini-chat-container"
      >
        <div id="mini-chat-msgs-header">
          <i className="fas fa-times" onClick={() => this.props.toggleChat()} />
        </div>
        <div id="mini-chat-msgs-body">

        </div>
        <div id="mini-chat-send-msg">
          <i className="fas fa-video" />
          <textarea name="message" id="mini-chat-input" rows="1" onChange={e => this.handleChange(e)}/>
          <i className="fas fa-paper-plane" />
        </div>
      </div>
    );
  }
}
