import React, { Component } from "react";
// import axios from "axios";
import "./MiniChat.scss";
import io from "socket.io-client";

export default class MiniChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      messageInput: "",
      userTyping: false
    };

    // this.socket = io.connect({secure: true});
    this.socket = io.connect(":4000");
    this.socket.on("generate room response", data => {
      console.log(data);
      this.roomResponse(data);
    });
    this.socket.on("user is typing", data => this.setUserTyping(data));
    this.socket.on(`user not typing`, data => this.removeUserTyping(data));
  }

  componentDidMount = async () => {
    const { userId, friend } = this.props.props;
    const { messageInput } = this.state;
    const room =
      userId > friend.user_id
        ? `${friend.user_id}${userId}`
        : `${userId}${friend.user_id}`;
    this.socket.emit(`join room`, { userId, messageInput, room });
  }

  handleChange = e => {
    this.setState({ messageInput: e.target.value });
  };

  sendMessage = async (userId, friendChatId, messageInput) => {
    const room =
      userId > friendChatId
        ? `${friendChatId}${userId}`
        : `${userId}${friendChatId}`;
    this.socket.emit(`blast message to room`, { userId, messageInput, room });
    this.setState({messageInput: ''})
  };
  roomResponse(data) {
    this.setState({
      messages: [...this.state.messages, data]
    });
  }

  enterKey = (e) => {
    const {
      userId,
      // messages,
      // displayChat,
      friendChatId,
      // friend
    } = this.props.props;
    const code = e.keyCode || e.which;
    if (code === 13) {
        this.sendMessage(userId, friendChatId, this.state.messageInput);
    }
  };

  render() {
    const { messageInput } = this.state;
    const {
      userId,
      // messages,
      displayChat,
      friendChatId,
      friend,
      friendMessages
    } = this.props.props;

    const displayOldMessages = friendMessages.map((message, i) => {
      if (userId === message.user_id) {
        return (
          <div key={i} id="my-message-line-container">
            <div id="message-line">
              <p>{message.comment}</p>
            </div>
          </div>
        );
      }
      return (
        <div key={i} id="your-message-line-container">
          <div id="message-line">
            <p>{message.comment}</p>
          </div>
        </div>
      );
    });
    const displayMessages = this.state.messages.map((message, i) => {
      if (userId === message.userId) {
        return (
          <div key={i} id="my-message-line-container">
            <div id="message-line">
              <p>{message.messageInput}</p>
            </div>
          </div>
        );
      }
      return (
        <div key={i} id="your-message-line-container">
          <div id="message-line">
            <p>{message.messageInput}</p>
          </div>
        </div>
      );
    });

    return (
      <div
        style={
          displayChat && friendChatId === friend.user_id
            ? {
                // overflow: "hidden",
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
          <h5>{`${friend.first_name}`}</h5>
          <i
            className="fas fa-times"
            onClick={() => this.props.props.toggleChat(friendChatId)}
          />
        </div>
        <div id="mini-chat-msgs-body">
          {displayOldMessages}
          {displayMessages}
        </div>
        <div id="mini-chat-send-msg">
          <i className="fas fa-video" />
          <textarea
            name="message"
            id="mini-chat-input"
            rows="1"
            onChange={e => this.handleChange(e)}
            onKeyPress={(e) => this.enterKey(e)}
            value={messageInput}
          />
          <i
            className="fas fa-paper-plane"
            onClick={() => this.sendMessage(userId, friendChatId, messageInput)}
          />
        </div>
      </div>
    );
  }
}
