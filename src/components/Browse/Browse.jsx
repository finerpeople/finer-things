import React, { Component } from "react";
import axios from "axios";
import Book from './../Book/Book';
<<<<<<< HEAD
import {Link} from 'react-router-dom';
=======
import { Link } from 'react-router-dom';
>>>>>>> e85b0e7504d0a477088361fbd6efab03528c8e1d
import "./Browse.scss";

const key = process.env.REACT_APP_NYT

export default class Browse extends Component {
  state = {
<<<<<<< HEAD
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
=======
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
>>>>>>> e85b0e7504d0a477088361fbd6efab03528c8e1d
        })
        console.log(res.data.results.books);

      });
<<<<<<< HEAD
    // let books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=40&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/industryIdentifiers, volumeInfo/categories, volumeInfo/averageRating, volumeInfo/imageLinks, volumeInfo/previewLink)`)
=======


>>>>>>> e85b0e7504d0a477088361fbd6efab03528c8e1d
  }


  

  render() {
    let fictionDisplay = this.state.fictionList.map((book, i) => {
<<<<<<< HEAD
      // <Book 
      // key={i}
      // isbn={book.primary_isbn13}
      // />
      return (
        <Link to={`book/${book.primary_isbn13}` }>
          <img src={book.book_image} alt='book cover' className='' />
        </Link>
      )
    })
    return (
      <div>
        <h1>Here is the Browser</h1>
        {fictionDisplay}
=======
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
      <div className='br-container '>
        {/* <h1>Here is the Browser</h1> */}
        <p className='br-list-title'>Fiction Best Sellers</p>
        <div className='book-carousel'>
          {fictionDisplay}
        </div>
        <p className='br-list-title'>Non-Fiction Best Sellers</p>
        <div className='book-carousel'>
          {nonFictionDisplay}
        </div>
        <p className='br-list-title'>Advice, How-To & Miscellaneous Best Sellers</p>
        <div className='book-carousel'>
          {adviceHowToDisplay}
        </div>
        <p className='br-list-title'>Young Adult Best Sellers</p>
        <div className='book-carousel'>
          {youngAdultDisplay}
        </div>

>>>>>>> e85b0e7504d0a477088361fbd6efab03528c8e1d
      </div>
    );
  }
}
