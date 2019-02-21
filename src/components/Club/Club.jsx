import React, { Component } from 'react'
import axios from 'axios'
import './Club.scss'
import Card from '../Browse/Card';
import {Link} from 'react-router-dom';

export default class Club extends Component {
  state = {
    userId: '',
    clubId: this.props.match.params.club_id,
    club: {},
    books: []
  }

  componentDidMount = async () => {
    await this.getSession();
    await this.getClub()
    await this.getClubBooks()
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
    let res = await axios.get(`/club/getOneClub/${this.state.clubId}`)
    this.setState({
      club: res.data[0]
    })
  }

  getClubBooks = async () => {
    let res = await axios.get(`/clubLibrary/getClubBooks/${this.state.clubId}`)
    this.setState({
      books: res.data
    })
  }
  render() {
    const {club_name, summary, first_name, last_name, email, profile_pic} = this.state.club
    let displayBooks = this.state.books.map((book,i) => {
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
          />
        </div>
      )
    })
    return (
      <div className='club-book-details-main-container'>
      <Link to={'/my-clubs'}>Back</Link>
        <div>
          Books in Club
          {displayBooks}
        </div>
        <div>
          <h1>{club_name}</h1>
          <div>
            Summary:
            {summary} 
            owner name
            <img src={profile_pic} alt='profile pic'/>
            {first_name} {last_name}
            {email}
          </div>
          <div>
            Members
          </div>
        </div>

      </div>
    )
  }
}
