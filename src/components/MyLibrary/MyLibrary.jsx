import React, { Component } from "react";
import axios from "axios";
import "./MyLibrary.scss";
import Card from "../Browse/Card";

export default class MyLibrary extends Component {

  state = {
    user_id: 0,
    library: [],
    recommendedLibrary: []
  }

  componentDidMount = async () => {
    await this.getSession();
    await this.getLibrary()
    await this.getRecommendedLibrary()

  };

  getLibrary = async () => {
    let res = await axios.get(`/library/getMyLibrary/${this.state.user_id}`)
    this.setState({ library: res.data })
  }

  getRecommendedLibrary = async () => {
    let res = await axios.get(`/library/getRecommendedLibrary/${this.state.user_id}`)
    this.setState({ recommendedLibrary: res.data })
  }

  async addRecommended(user_id, user_library_id) {
    let res = await axios.put(`/library/changeNewStatus/${user_id}&${user_library_id}`)
    this.setState({
      myLibrary: res.data
    })
    await this.getLibrary()
    await this.getRecommendedLibrary()
  }

  dynamicSort(key) {
    var sortOrder = 1;

    if (key[0] === "-") {
      sortOrder = -1;
      key = key.substr(1);
    }
    return function (a, b) {
      if (sortOrder === -1) {
        return b[key].toString().localeCompare(a[key].toString());
      } else {
        return a[key].toString().localeCompare(b[key].toString());
      }
    }
  }

  sortBooks = async (sortOrder) => {
    let sortedArray = [...this.state.filteredLibrary]
    await sortedArray.sort(this.dynamicSort(sortOrder))
    this.setState({
      filteredLibrary: sortedArray
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
    await this.getLibrary()
    await this.getRecommendedLibrary()

  }

  render() {
    let displayBooks = this.state.library.map((book, i) => {
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
            getLibrary={() => this.getLibrary(this.state.user_id)}
            book_status={book.status}
          />
        </div>
      )
    })

    let recommendedBooks = this.state.recommendedLibrary.map((book, i) => {
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
            addRecommended={() => this.addRecommended(this.state.user_id, book.user_library_id)}
          />
        </div>
      )
    })

    return (
      <div className='my-lib-container'>
        {this.state.recommendedLibrary.length >= 1 ? (
          <div className='my-lib-recommended-container'>
            <div className='my-lib-title'>My Recommended Books</div>
            <div className='my-lib-recommended-list'>
              {recommendedBooks}
            </div>
          </div>
        ) : null}
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
