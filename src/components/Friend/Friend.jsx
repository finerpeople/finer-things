import React, { Component } from "react";
import axios from "axios";
import "./Friend.scss";
import FriendCard from "./FriendCard";

export default class Friend extends Component {
  state = {
    userId: "",
    friends: [],
    recFriends: [],
    allUsers: [],
    displayChat: false,
    friendChatId: "",
    friendMessages: [],
    searchInput: "",
    searchFriends: []
  };

  componentDidMount = async () => {
    this.getSession();
  };
  // componentWillUpdate() {
  //   this.getSession()
  // }

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

    const allUsers = [...friends, ...recFriends];
    this.setState({
      userId: id,
      friends,
      recFriends,
      allUsers
    });
  };

  addFriend = async friendId => {
    const { userId } = this.state;
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

  deleteFriend = async friendId => {
    const { userId } = this.state;
    const res = await axios.delete(`/api/deleteFriend/${userId}&${friendId}`);
    await this.setState({
      friends: res.data.friends,
      recFriends: res.data.recFriends
    });
    this.getSession();
  };

  handleChange = e => {
    this.setState({ searchInput: e.target.value });
  };

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
            <button onClick={() => this.addFriend(friendId)}>Add</button>
          </div>
        </div>
      );
    });

    const searchUsers = this.state.allUsers.map((friendObj, i) => {
      const { first_name, last_name, user_id, profile_pic } = friendObj;
      const friendName = first_name + " " + last_name;
      let isFriend = friends.map(friendObj2 => {
        if (friendObj2.user_id === user_id) return user_id;
      });
      const switchButton = isFriend.includes(user_id) ? (
        <button onClick={() => this.deleteFriend(user_id)}>Remove</button>
      ) : (
        <button onClick={() => this.addFriend(user_id)}>Add</button>
      );
      if (friendName.toLowerCase().includes(this.state.searchInput)) {
        return (
          <div key={i} id="friend-search-row">
            <div
              className="search-profile-pic"
              style={{ backgroundImage: `url(${profile_pic})` }}
            />
            <div id="friend-search-row-info">
              <p>{`${first_name} ${last_name}`}</p>
              <div id="friend-search-row-info-btn">
                <i
                  className="fas fa-comments"
                  onClick={() => this.toggleChat(user_id)}
                />
                {switchButton}
              </div>
            </div>
          </div>
        );
      }
    });

    const searchResults = !this.state.searchInput
      ? "friend-search-none"
      : "friend-search-results";

    return (
      <div id="friend">
        <div id="friend-header">
          <div className="friend-input-container">
            <input
              className="friend-input"
              type="text"
              placeholder="Search"
              onChange={e => this.handleChange(e)}
            />
            <div id={searchResults}>{searchUsers}</div>
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
