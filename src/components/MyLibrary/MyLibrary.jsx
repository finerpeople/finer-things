import React, { Component } from "react";
import axios from "axios";
import "./MyLibrary.scss";
import Card from "../Browse/Card";

export default class MyLibrary extends Component {

  state = {
    user_id: 0,
    myLibrary: []
  }

  componentDidMount = async () => {
    await this.getSession();
    this.getMyLibrary();
  };

  getMyLibrary = async () => {
    let res = await axios.get(`/library/allBooks/${this.state.user_id}`)
    this.setState({
      myLibrary: res.data
    })

  }

  getSession = async () => {
    const res = await axios.get("/api/session");
    this.setState({ user_id: res.data.id })
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
  };

  render() {
    let displayBooks = this.state.myLibrary.map((book, i) => {
      return (
        <div key={i}>
          <Card
            i={i}
            img={book.book_img}
            isbn={book.book_isbn}
            user_id={this.state.user_id}
            search={true}
            myLibrary={true}
          />
          <button>delete</button>
        </div>
      )
    })
    return (
      <div className='my-lib-container'>
        <div className='my-lib-title'>My Library</div>
        <div className='my-lib-list'>{displayBooks}</div>
      </div>
    );
  }
}
