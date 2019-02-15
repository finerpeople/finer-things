import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import "./Browse.scss";
import Card from "./Card";

import "./Browse.scss";

const key = process.env.REACT_APP_NYT;

class Browse extends Component {
  state = {
    listName: [],
    user_id: 0
  };

  componentDidMount = async () => {
    this.getSession();
    const res = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/current/${
      this.props.urlList
      }.json?api-key=${key}`
    );
    this.setState({
      listName: res.data.results.books
    });
  };

  getSession = async () => {
    const res = await axios.get("/api/session");
    this.setState({
      user_id: res.data.id
    })
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
  };

  render() {
    let displayList = this.state.listName.map((book, i) => {
      return (
        <div key={i}>
          <Card
            i={i}
            img={book.book_image}
            isbn={book.primary_isbn13}
            user_id={this.state.user_id}
          />
        </div>
      );
    });

    return (
      <div className="br-main">
        <div className="br-container">
          <div className="br-list-title">{this.props.title}</div>
          <div className="book-carousel br-top-list">{displayList}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Browse);
