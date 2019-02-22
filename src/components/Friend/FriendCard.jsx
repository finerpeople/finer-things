import React, { Component } from "react";
// import axios from "axios";
import MiniChat from "../MiniChat/MiniChat";
import io from "socket.io-client";

export default class FriendCard extends Component {
  state = {
    displayChat: false,
  };

  render() {
    const {
      user_id,
      profile_pic,
      first_name, 
      last_name,
    } = this.props.friend;
    const {deleteFriend, toggleChat, userId} = this.props

    const friendId = user_id

    return (
      <div key={friendId} id="my-friends-card">
        <div id="my-friends-card-more">
          <i
            className="fas fa-comments"
            onClick={() => toggleChat(friendId)}
          />
          <button
            onClick={() => deleteFriend(userId, friendId)}
          >
            Remove
          </button>
        </div>
        <div id="my-friends-pic-container">
          <div
            className="friends-profile-pic"
            style={{ backgroundImage: `url(${profile_pic})` }}
          />
        </div>
        <div id="my-friend-name">
          <p>{`${first_name} ${last_name}`}</p>
        </div>
        
        <MiniChat props={this.props}/>

      </div>
    );
  }
}
