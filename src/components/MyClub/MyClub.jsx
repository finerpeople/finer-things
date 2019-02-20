import React, { Component } from 'react'
import axios from 'axios'
import Club from '../Club/Club'
import './MyClub.scss'
import ClubCard from './ClubCard';

export default class MyClub extends Component {
  state = {
    userId: "",
    myClubs: [],
    recclubs: []
  };

  componentDidMount = async () => {
    await this.getSession();
    await this.getUsersClubs()
  };

  getSession = async () => {
    let id = "";
    let clubs = [];
    let recClubs = [];

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
    console.log(res.data)
    this.setState({
      myClubs: res.data
    })
  }

  render() {
    const { userId, clubs, recClubs } = this.state;

    let displayMyClubs = this.state.myClubs.map((club, i) => {
      return (
  
        <ClubCard
          clubName={club.club_name}
          firstName={club.first_name}
          lastName={club.last_name}
          email={club.email}
          profilePic={club.profile_pic}
          clubId={club.club_id}
        />
      )
    })
    // const myClubs = clubs.map((club, i) => {
    //   console.log(club);
    //   const { first_name, last_name, profile_pic, user_id } = club;
    //   return (
    //     <div key={i} id="my-clubs-card">
    //       <div id="my-clubs-pic-container">
    //       <div
    //           className="clubs-profile-pic"
    //           style={{ backgroundImage: `url(${profile_pic})` }}
    //         />
    //       </div>
    //       <p>{`${first_name} ${last_name}`}</p>
    //     </div>
    //   );
    // });
    // const myRecClubs = recClubs.map((club, i) => {
    //   const { first_name, last_name, profile_pic, user_id } = club;
    //   if (user_id === userId) return;
    //   const profilePic = `"backgroundColor:url(${profile_pic})"`;
    //   return (
    //     <div key={i} id="my-rec-card">
    //       <div id="my-rec-pic-container">
    //         <div
    //           className="rec-profile-pic"
    //           style={{ backgroundImage: `url(${profile_pic})` }}
    //         />
    //       </div>
    //       <p>{`${first_name} ${last_name}`}</p>
    //     </div>
    //   );
    // });

    return (
      <div id="club">
        <div id="club-header">
          <div className="app-input-container">
            <input className="app-input" type="text" placeholder="Search" />
          </div>
          <div className="search-input-btn">
            <i className="fas fa-search" />
          </div>
        </div>
        {/* ///////////////////////////////////////////////////// */}
        <div id="club-body">
          <div id="recommend">
            <h4>Recommendations</h4>
            {/* {myRecClubs} */}
          </div>
          <div id="my-clubs">
            <h4>Clubs</h4>
            {displayMyClubs}
          </div>
        </div>
      </div>
    );
  }
}

