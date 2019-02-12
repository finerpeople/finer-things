import React, { Component } from "react";
import axios from "axios";
import Book from './../Book/Book';
import { Link } from 'react-router-dom';
import "./Browse.scss";

const key = process.env.REACT_APP_NYT

export default class Browse extends Component {
  state = {
    fictionList: [],
    nonFictionList: [],
    adviceHowToList: [],
    youngAdultList: []
  }
  componentDidMount() {
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-fiction.json?api-key=${key}`
      )
      .then(res => {
        this.setState({
          fictionList: res.data.results.books
        })
        console.log(res.data.results.books);

      });
      axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/combined-print-and-e-book-nonfiction.json?api-key=${key}`
      )
      .then(res => {
        this.setState({
          nonFictionList: res.data.results.books
        })
        console.log(res.data.results.books);

      });
      axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/advice-how-to-and-miscellaneous.json?api-key=${key}`
      )
      .then(res => {
        this.setState({
          adviceHowToList: res.data.results.books
        })
        console.log(res.data.results.books);

      });
      axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/current/young-adult.json?api-key=${key}`
      )
      .then(res => {
        this.setState({
          youngAdultList: res.data.results.books
        })
        console.log(res.data.results.books);

      });


  }


  

  render() {
    let fictionDisplay = this.state.fictionList.map((book, i) => {
      return (
        <div >
          <Link to={`/book/${book.primary_isbn13}`}>
            <img src={book.book_image} alt='book cover' className='br-book-cover' />
          </Link>
        </div>
      )
    })

    let nonFictionDisplay = this.state.nonFictionList.map((book, i) => {
      return (
        <div >
          <Link to={`/book/${book.primary_isbn13}`}>
            <img src={book.book_image} alt='book cover' className='br-book-cover' />
          </Link>
        </div>
      )
    })

    let adviceHowToDisplay = this.state.adviceHowToList.map((book, i) => {
      return (
        <div >
          <Link to={`/book/${book.primary_isbn13}`}>
            <img src={book.book_image} alt='book cover' className='br-book-cover' />
          </Link>
        </div>
      )
    })
    let youngAdultDisplay = this.state.youngAdultList.map((book, i) => {
      return (
        <div >
          <Link to={`/book/${book.primary_isbn13}`}>
            <img src={book.book_image} alt='book cover' className='br-book-cover' />
          </Link>
        </div>
      )
    })

    return (
      <div className='br-main'>
        <div className='br-container'>
        <div className='br-list-title'>Fiction Best Sellers</div>
        <div className='book-carousel br-top-list'>
          {fictionDisplay}
        </div>
        </div>

        <div className='br-container'>
        <p className='br-list-title'>Non-Fiction Best Sellers</p>
        <div className='book-carousel'>
          {nonFictionDisplay}
        </div>
        </div>

        <div className='br-container '>
        <p className='br-list-title'>Advice, How-To & Miscellaneous Best Sellers</p>
        <div className='book-carousel'>
          {adviceHowToDisplay}
        </div>
        </div>

        <div className='br-container'>
        <p className='br-list-title'>Young Adult Best Sellers</p>
        <div className='book-carousel'>
          {youngAdultDisplay}
        </div>
        </div>

      </div>
    );
  }
}
