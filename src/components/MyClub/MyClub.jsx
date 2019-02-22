import React, { Component } from 'react'
import axios from 'axios'
import ClubCard from './ClubCard';
import { connect } from 'react-redux';

import './MyClub.scss'

class MyClub extends Component {
  state = {
    userId: "",
    myClubs: [],
    otherClubs: [],
    summary: '',
    clubName: '',
    toggleAddClub: false
  };

  toggle = () => {
    this.setState({toggleAddClub: !this.state.toggleAddClub})
  }

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    })
  }

  componentDidMount = async () => {
    await this.getSession();
    await this.getUsersClubs();
    await this.getOtherClubs();
  };

  getSession = async () => {
    let id = "";

    let res = await axios.get("/api/session");
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
    id = res.data.id;

    this.setState({
      userId: id
    });
  };

  getUsersClubs = async () => {
    let res = await axios.get(`/club/getUsersClubs/${this.state.userId}`)
    this.setState({
      myClubs: res.data
    })
  }

  getOtherClubs = async () => {
    let res = await axios.get(`/club/getOtherClubs/${this.state.userId}`)
    this.setState({
      otherClubs: res.data
    })
  }

  joinClub = async (club_id) => {
    let res = await axios.post(`/club/joinClub/${club_id}&${this.state.userId}`)
    this.setState({
      myClubs: res.data
    })
    await this.getOtherClubs()
  }

  quitClub = async (club_id) => {
    let res = await axios.delete(`/club/quitClub/${club_id}&${this.state.userId}`)
    this.setState({
      myClubs: res.data
    })
    await this.getOtherClubs()
  }

  createNewClub = async () => {
    let res = await axios.post('/club/createNewClub', {
      club_name: this.state.clubName, 
      club_owner: this.state.userId,
      summary: this.state.summary
    })
    this.setState({
      myClubs: res.data,
      clubName: '',
      summary: ''
    })
    this.toggle()
  }

  render() {

    let displayMyClubs = this.state.myClubs.map((club, i) => {
      return (
        <div key={club.club_id}>
          <ClubCard
            clubName={club.club_name}
            firstName={club.first_name}
            lastName={club.last_name}
            email={club.email}
            profilePic={club.profile_pic}
            button={'quit'}
            clubId={club.club_id}
            joinRemoveFn={this.quitClub}
          />
        </div>
      )
    })

    let displayOtherClubs = this.state.otherClubs.map((club, i) => {
      return (
        <div key={club.club_id}>
          <ClubCard
            clubName={club.club_name}
            firstName={club.first_name}
            lastName={club.last_name}
            email={club.email}
            profilePic={club.profile_pic}
            button={'join'}
            clubId={club.club_id}
            joinRemoveFn={this.joinClub}
          />
        </div>
      )
    })

    return (
      <div id="club">
        <div>
        <button onClick={this.toggle}>+</button>
        {this.state.toggleAddClub ? (
          <div>
            <label>
              Club Name: 
              <input 
              value={this.state.clubName}
              onChange={(e) => this.handleChange('clubName', e.target.value)}
              />
            </label>
            <label>
              Club Summary: 
              <textarea
              value={this.state.summary}
              onChange={(e) => this.handleChange('summary', e.target.value)}
              ></textarea>
            </label>
            <button onClick={this.createNewClub}>Create</button>
          </div>
        ) : null}
          <div id="club-header">
            <div className="app-input-container">
              <input className="app-input" type="text" placeholder="Search" />
            </div>
            <div className="search-input-btn">
              <i className="fas fa-search" />
            </div>
          </div>
          <div id="club-body">
            <div id="recommend">
              <h4>Recommendations</h4>
              {displayOtherClubs}
            </div>
            <div id="my-clubs">
              <h4>Clubs</h4>
              {displayMyClubs}
            </div>
          </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(MyClub)