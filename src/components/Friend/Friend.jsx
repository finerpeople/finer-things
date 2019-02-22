import React, { Component } from "react";
import axios from "axios";
import "./Friend.scss";
import FriendCard from "./FriendCard";

export default class Friend extends Component {
  state = {
    userId: "",
    friends: [],
    recFriends: [],
    displayChat: false,
    friendChatId: "",
    friendMessages: [],
    searchInput: '',
    searchFriends: []
  };

  componentDidMount = async () => {
    this.getSession();
  };

  getSession = async () => {
    let id = "";
    let friends = [];
    let recFriends = [];

    let res = await axios.get("/api/session");
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
    id = res.data.id;

    res = await axios.get(`/api/friendsData/${id}`);
    friends = res.data;

    res = await axios.get(`/api/recFriendsData/${id}`);
    recFriends = res.data;

    this.setState({
      userId: id,
      friends,
      recFriends
    });
  };

  addFriend = async (userId, friendId) => {
    const res = await axios.post("/api/addFriend", { userId, friendId });
    this.setState({
      friends: res.data.friends,
      recFriends: res.data.recFriends
    });
  };

  toggleChat = async friendId => {
    const { userId } = this.state;
    const res = await axios.post("/api/getMessages", { userId, friendId });
    // console.log(res.data)
    this.setState({
      friendMessages: res.data,
      displayChat: !this.state.displayChat,
      friendChatId: friendId
    });
  };

  getMessages = async () => {
    const { userId, friendChatId } = this.state;
    let friendId = friendChatId;
    const res = await axios.post("/api/getMessages", { userId, friendId });
    this.setState({
      friendMessages: res.data
    });
  };

  deleteFriend = async (userId, friendId) => {
    console.log(userId, friendId);
    const res = await axios.delete(`/api/deleteFriend/${userId}&${friendId}`);
    this.setState({
      friends: res.data.friends,
      recFriends: res.data.recFriends
    });
  };

  handleChange = (e) => {
    this.setState({searchInput: e.target.value})
  }

  render() {
    const {
      userId,
      friends,
      recFriends,
      displayChat,
      friendChatId,
      friendMessages
    } = this.state;
    const myFriends = friends.map((friend, i) => {
      return (
        <FriendCard
          key={i}
          friend={friend}
          deleteFriend={this.deleteFriend}
          getMessages={this.getMessages}
          toggleChat={this.toggleChat}
          userId={userId}
          displayChat={displayChat}
          friendChatId={friendChatId}
          friendMessages={friendMessages}
        />
      );
    });
    const myRecFriends = recFriends.map((friend, i) => {
      const { first_name, last_name, profile_pic, user_id } = friend;
      if (user_id === userId) return;
      // const profilePic = `"backgroundColor:url(${profile_pic})"`;
      const friendId = user_id;
      return (
        <div key={i} id="my-rec-card">
          <div id="my-rec-pic-container">
            <div
              className="rec-profile-pic"
              style={{ backgroundImage: `url(${profile_pic})` }}
            />
          </div>
          <div id="my-rec-name">
            <p>{`${first_name} ${last_name}`}</p>
            <button onClick={() => this.addFriend(this.state.userId, friendId)}>
              Add
            </button>
          </div>
        </div>
      );
    });

    const filteredFriends = this.state.friends.filter((friendObj, i) => {
      return (
        <div>
          <img src="" alt="profile picture"/>
          <p>name</p>
          <i>chat icon</i>
          <button>add</button>
        </div>
      )
    })

    return (
      <div id="friend">
        <div id="friend-header">
          <div className="app-input-container">
            <input className="app-input" type="text" placeholder="Search" onChange={e => this.handleChange(e)}/>
          </div>
          <div className="search-input-btn">
            <i className="fas fa-search" />
          </div>
        </div>
        {/* ///////////////////////////////////////////////////// */}
        <div id="friend-body">
          <div id="recommend">
            <h4>Recommendations</h4>
            {myRecFriends}
          </div>
          <div id="my-friends">
            <h4>Friends</h4>
            {myFriends}
          </div>
        </div>
      </div>
    );
  }
}
