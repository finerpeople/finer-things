import React, { Component } from "react";
import axios from "axios";
import Book from './../Book/Book';
import {Link} from 'react-router-dom';
import "./Browse.scss";

const key = process.env.REACT_APP_NYT

export default class Browse extends Component {
  state = {
    fictionList: []
  }
  componentDidMount() {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:9780735219113')
      .then(res => {
        console.log(res.data)
      })
    axios
      .get(
        // `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${key}`
        `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=eqLOyVkh9IvUeRF7ktALUnsxSMRJ9s52`
      )
      .then(res => {
        this.setState({
          fictionList: res.data.results.books
        })
        console.log(res.data.results.books);

      });
    // let books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=40&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/industryIdentifiers, volumeInfo/categories, volumeInfo/averageRating, volumeInfo/imageLinks, volumeInfo/previewLink)`)
  }

  render() {
    let fictionDisplay = this.state.fictionList.map((book, i) => {
      // <Book 
      // key={i}
      // isbn={book.primary_isbn13}
      // />
      return (
        <Link to={`book/${book.primary_isbn13}` }>
          <img src={book.book_image} alt='book cover'  />
        </Link>
      )
    })
    return (
      <div>
        <h1>Here is the Browser</h1>
        {fictionDisplay}
      </div>
    );
  }
}
