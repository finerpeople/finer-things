import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";

import "./Browse.scss";

const key = process.env.REACT_APP_NYT

export default class Browse extends Component {

  state = {
    listName: []
  }

  componentDidMount() {
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/${this.props.urlList}.json?api-key=${key}`
      )
      .then(res => {
        this.setState({
          listName: res.data.results.books
        })
      });
  }

  render() {
    let displayList = this.state.listName.map((book, i) => {
      return (
        <div key={i}>
          <Card
            i={i}
            img={book.book_image}
            isbn={book.primary_isbn13}
          />
        </div>
      )
    })

    return (
      <div className='br-main'>
        <div className='br-container'>
          <div className='br-list-title'>
            {this.props.title}
          </div>
          <div className='book-carousel br-top-list'>
            {displayList}
          </div>
        </div>
      </div>
    );
  }
}
