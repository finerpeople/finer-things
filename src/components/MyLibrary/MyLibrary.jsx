import React, { Component } from "react";
import axios from "axios";
import "./MyLibrary.scss";
import Card from "../Browse/Card";

export default class MyLibrary extends Component {

  state = {
    user_id: 0,
    myLibrary: [],
    recommended: []
  }

  componentDidMount = async () => {
    await this.getSession();
    await this.getMyLibrary();

  };

  getMyLibrary = async () => {
    // console.log(this.state.user_id)
    let res = await axios.get(`/library/allBooks/${this.state.user_id}`)
    this.setState({
      myLibrary: res.data
    })
  }

  dynamicSort(key) {
    var sortOrder = 1;

    if (key[0] === "-") {
      sortOrder = -1;
      key = key.substr(1);
    }
    // console.log(key)
    return function (a, b) {
      if (sortOrder === -1) {
        return b[key].toString().localeCompare(a[key].toString());
      } else {
        return a[key].toString().localeCompare(b[key].toString());
      }
    }
  }

  sortBooks = async (sortOrder) => {
    let sortedArray = [...this.state.myLibrary]
    await sortedArray.sort(this.dynamicSort(sortOrder))
    this.setState({
      myLibrary: sortedArray
    })
  }

  getSession = async () => {
    const res = await axios.get("/api/session");
    this.setState({ user_id: res.data.id })
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
  };

  async deleteBook(user_library_id) {

    await axios.delete(`/library/removeBook/${user_library_id}&${this.state.user_id}`)

    this.getMyLibrary()
  }

  render() {
    let displayBooks = this.state.myLibrary.map((book, i) => {
      // console.log(book)
      if (book.status === 'Recommended') {
        this.state.recommended.push(book)
      } else {
        return (
          <div key={book.user_library_id}>
            <Card
              i={i}
              user_library_id={book.user_library_id}
              img={book.book_img}
              isbn={book.book_isbn}
              user_id={this.state.user_id}
              search={true}
              myLibrary={true}
              deleteBook={() => this.deleteBook(book.user_library_id)}
              book_status={book.status}
            />
          </div>
        )
      }
    })

    let recommendedBooks = this.state.recommended.map((book, i) => {
      return (
        <div key={book.user_library_id}>
          <Card
            i={i}
            user_library_id={book.user_library_id}
            img={book.book_img}
            isbn={book.book_isbn}
            user_id={this.state.user_id}
            search={true}
            myLibrary={true}
            deleteBook={() => this.deleteBook(book.user_library_id)}
            book_status={book.status}
          />
        </div>
      )
    })
    // console.log(this.state.recommended)
    // console.log(recommendedBooks)

    return (
      <div className='my-lib-container'>
        <div className='my-lib-recommended-container'>
          <div className='my-lib-title'>My Recommended Books</div>
          <div className='my-lib-recommended-list'>
            {recommendedBooks}
          </div>
        </div>
        <div className='my-lib-title'>My Books</div>
        <div className='my-lib-sort-container'>
          <select className='my-lib-sort' name="sort" id="sort" onChange={(e) => this.sortBooks(e.target.value)}>
            <option value="-date_added">Sort Options</option>
            <option value="book_title">Book Title</option>
            <option value="book_author">Author</option>
            <option value="-user_rating">Rating High to Low</option>
            <option value="user_rating">Rating Low to High</option>
            <option value="-date_added">Newest Added</option>
            <option value="date_added">Oldest Added</option>
          </select>
        </div>
        <div className='my-lib-list'>{displayBooks}</div>
      </div>
    );
  }
}
