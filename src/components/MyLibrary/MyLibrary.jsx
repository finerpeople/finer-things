import React, { Component } from "react";
import axios from "axios";
// import Book from '../Book/Book'
import "./MyLibrary.scss";
import Card from "../Browse/Card";

export default class MyLibrary extends Component {

  state = {
    user_id: 0,
    myLibrary: []
  }

  componentDidMount = async () => {
    await this.getSession();
    await this.getMyLibrary();

  };

  getMyLibrary = async () => {
    console.log(this.state.user_id)
    let res = await axios.get(`/library/allBooks/${this.state.user_id}`)
    // console.log(res.data)
    // res.data.sort(this.dynamicSort('book_title'))
    console.log(res.data)
    this.setState({
      myLibrary: res.data
    })
  }

  dynamicSort(key) {
    // console.log(key)
    console.log(this.state.myLibrary)
    var sortOrder = 1;

    if(key[0] === "-") {
        sortOrder = -1;
        key = key.substr(1);
    }
    // console.log(key)
    return function (a, b) {
      if (sortOrder == -1) {
        return b[key].localeCompare(a[key]);
      } else {
        return a[key].localeCompare(b[key]);
      }
    }
  }

  sortBooks = async (sortOrder) => {
    let sortedArray = [...this.state.myLibrary]
    await sortedArray.sort(this.dynamicSort(sortOrder))
    this.setState({
      myLibrary: sortedArray
    })
    console.log(this.state.myLibrary)
  }

  getSession = async () => {
    const res = await axios.get("/api/session");
    this.setState({ user_id: res.data.id })
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
  };

  async deleteBook(user_library_id){
    await axios.delete(`/library/removeBook/${user_library_id}&${this.state.user_id}`)
    this.getMyLibrary()
  }

  render() {
    let displayBooks = this.state.myLibrary.map((book, i) => {
      return (
        <div key={i}>
          <Card
            i={i}
            user_library_id={book.user_library_id}
            img={book.book_img}
            isbn={book.book_isbn}
            user_id={this.state.user_id}
            search={true}
            deleteBook={this.deleteBook}
          />
          <button onClick={() => this.deleteBook(book.user_library_id)}>delete</button>
        </div>
      )
    })
    return (
      <div className='my-lib-container'>
        <div className='my-lib-title'>My Library</div>
        <div><button onClick={() => this.sortBooks("book_title")}>sort</button></div>
        <div className='my-lib-list'>{displayBooks}</div>
      </div>
    );
  }
}
