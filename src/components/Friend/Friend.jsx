import React, { Component } from "react";
import axios from "axios";
import "./Friend.scss";

export default class Friend extends Component {
  state = {
    userId: "",
    friends: [],
    recFriends: []
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

  render() {
    const { userId, friends, recFriends } = this.state;
    const myFriends = friends.map((friend, i) => {
      console.log(friend);
      const { first_name, last_name, profile_pic, user_id } = friend;
      return (
        <div id="my-friends-cards">
          <div id="my-friends-card">
            <img id={user_id} src={profile_pic} alt="profile picture" />
          </div>
          <p>{`${first_name} ${last_name}`}</p>
        </div>
      );
    });
    const myRecFriends = recFriends.map((friend, i) => {
      const { first_name, last_name, profile_pic, user_id } = friend;
      return (
        <div id="my-rec-cards">
          <div id="my-rec-card">
            <img id={user_id} src={profile_pic} alt="profile picture" />
          </div>
          <p>{`${first_name} ${last_name}`}</p>
        </div>
      );
    });

    return (
      <div id="friend">
        <div id="friend-header">
          <div className="app-input-container">
            <input className="app-input" type="text" placeholder="Search" />
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
