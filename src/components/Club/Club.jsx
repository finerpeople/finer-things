import React, { Component } from "react";
import axios from "axios";
import Card from "../Browse/Card";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateClubName } from "../../ducks/reducer";
import MiniChat from "../MiniChat/MiniChat";

import "./Club.scss";

class Club extends Component {
  state = {
    userId: "",
    clubId: this.props.match.params.club_id,
    club: {},
    books: [],
    members: [],
    chatToggle: false
  };

  componentDidMount = async () => {
    await this.getSession();
    await this.getClub();
    await this.getClubBooks();
    await this.getClubMembers();
  };

  getSession = async () => {
    let id = "";

    const res = await axios.get("/api/session");
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
    id = res.data.id;

    this.setState({
      userId: id
    });
  };

  getClub = async () => {
    let res = await axios.get(`/club/getOneClub/${this.state.clubId}`);
    await this.setState({ club: res.data[0] });
    await this.props.updateClubName(res.data[0].club_name);
  };

  getClubBooks = async () => {
    let res = await axios.get(`/clubLibrary/getClubBooks/${this.state.clubId}`);
    this.setState({ books: res.data });
  };

  getClubMembers = async () => {
    let res = await axios.get(`/club/getClubMembers/${this.state.clubId}`);
    this.setState({ members: res.data });
  };

  async deleteClubBook(club_book_id) {
    await axios.delete(
      `/clubLibrary/deleteClubBook/${club_book_id}&${this.state.clubId}`
    );
    await this.getClubBooks();
  }

  render() {
    const {
      summary,
      first_name,
      last_name,
      email,
      profile_pic
    } = this.state.club;
    let displayMembers = this.state.members.map((person, i) => {
      return (
        <div className='flexed member-card' key={person.user_id}>
          <div className='club-members-pic-div' style={{ backgroundImage: `url(${person.profile_pic})` }}></div>
          <p className='club-words name'>{person.first_name} {person.last_name}</p>
        </div>
      );
    });

    let displayBooks = this.state.books.map((book, i) => {
      return (
        <div key={book.club_book_id}>
          <Card
            i={i}
            user_library_id={book.book_club_id}
            img={book.book_img}
            isbn={book.book_isbn}
            user_id={this.state.userId}
            search={true}
            myLibrary={true}
            book_status={book.status}
            deleteBook={() => this.deleteClubBook(book.club_book_id)}
            clubBook={true}
            club={true}
          />
        </div>
      );
    });
    return (
      <div className='club-book-details-main-container flexed'>
        <Link style={{ textDecoration: 'none' }} className='a' to={'/my-clubs'}>
          <div className='club-back-container flexed'>
            <i className="fas fa-arrow-left 5x club-back"></i>
          </div>
        </Link>
        <div className="club-books flexed">
          <div className="club-chat-toggle">
            <i className="fas fa-comments" />
          </div>
          <h3 className="club-title">Books in Club: </h3>
          <div className="club-books-display flexed">{displayBooks}</div>
        </div>
        <div className="club-details-container flexed">
          <div className="club-details flexed">
            <div className="summary-container">
              <h3 className="club-title">Summary:</h3>
              <p className="club-words">{summary}</p>
            </div>
            <div className='club-owner-details flexed'>
              <div className='flexed club-owner-first'>
                <h3 className='club-title'>Owner:</h3>
                <div className='book-owner-img-div' style={{ backgroundImage: `url(${profile_pic})` }}></div>
                <p className='club-words owner-name'>{first_name} {last_name}</p>
              <p className='club-words'><b style={{fontFamily: '$bodyFontFamily'}}>Email:</b> {email}</p>
              </div>
            </div>
          </div>
          <div className='club-members'>
            <h2 className='club-title'>Members:</h2>
            <div className='flexed members-list'>
              {displayMembers}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { updateClubName }
)(Club);
