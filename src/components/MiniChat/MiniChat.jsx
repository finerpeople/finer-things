import React, { Component } from "react";
import axios from "axios";
import "./MiniChat.scss";

export default class MiniChat extends Component {
  state = {
    messageInput: ""
  };

  handleChange = e => {
    this.setState({ messageInput: e.target.value });
  };

  sendMessage = async (userId, friendChatId, messageInput) => {
    console.log(friendChatId)
    const res = await axios.post("/api/addMessage", {
      userId,
      friendId: friendChatId,
      message: messageInput
    });
    this.setState({
      messages: res.data
    });
    this.props.refreshMessages()
  };

  render() {
    const { messageInput } = this.state;
    const { userId, friendId, messages } = this.props;

    const chatDisplay = this.props.display ? "mini-chat-send-msg" : null;

    const displayMessages = messages.map((message, i) => (
        <div key={i} id="my-message-line">
          <p>{message.comment}</p>
        </div>
      )
    )

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
          <i
            className="fas fa-times"
            onClick={() => this.props.toggleChat(friendId)}
          />
        </div>
        <div id="mini-chat-msgs-body">
          {displayMessages}
        </div>
        <div id="mini-chat-send-msg">
          <i className="fas fa-video" />
          <textarea
            name="message"
            id="mini-chat-input"
            rows="1"
            onChange={e => this.handleChange(e)}
          />
          <i
            className="fas fa-paper-plane"
            onClick={() => this.sendMessage(userId, friendId, messageInput)}
          />
        </div>
      </div>
    );
  }
}
