import React, { Component } from 'react';
import Book from '../Book/Book';


import "./Browse.scss";
import './Card.scss';
import './Search.scss';
import axios from 'axios';


export default class Card extends Component {
    state = {
        bookModal: false,
        isbn: this.props.isbn
    }

    toggle = () => {
        this.setState({
            bookModal: !this.state.bookModal
        })
    }

    getSingleBook = async () => {
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.isbn}
        &maxResults=1&langRestrict=en&fields=kind, items(id, volumeInfo/title, 
        volumeInfo/authors, volumeInfo/industryIdentifiers, 
        volumeInfo/categories, volumeInfo/imageLinks)`)
        return res.data.items[0].volumeInfo
    }

    addToLibrary = async () => {
        const book = await this.getSingleBook();
        await axios.post('/library/addBook', {
            user_id: this.props.user_id,
            isbn: this.state.isbn,
            book_img: book.imageLinks.thumbnail,
            title: book.title,
            author: book.authors[0],
            category: book.categories[0]
        })
    }

    recommendToFriend = async () => {
        const book = await this.getSingleBook();
        await axios.post('/library/recommendBook', {
            user_id: 17,
            isbn: this.state.isbn,
            friend_id: 12,
            book_img: book.imageLinks.thumbnail,
            title: book.title,
            author: book.authors[0],
            category: book.categories[0]
        })
    }

    render() {
        return (
            <div className='card-main'>
                {this.state.bookModal ? (
                    <div className='book-modal-container'>

                        <Book
                            isbn={this.state.isbn}
                            addToLibrary={this.addToLibrary}
                        />
                        <button className='close-book-modal' onClick={this.toggle}>X</button>
                    </div>
                ) : (
                        null
                    )}
                {this.props.search ? (
                    this.props.myLibrary ? (
                        <div key={this.props.i} className='searched-single-book'>
                            <img src={this.props.img} alt='book cover' className='searched-book-cover' onClick={this.toggle} />
                            <div className='icon-banner'>
                                {/* <i className="fas fa-plus add-to-library"
                                    onClick={this.addToLibrary}></i>
                                <i className="fas fa-share search-share"
                                    onClick={this.recommendToFriend}></i> */}
                            </div>
                        </div>
                    ) : (
                        <div key={this.props.i} className='searched-single-book'>
                            <img src={this.props.img} alt='book cover' className='searched-book-cover' onClick={this.toggle} />
                            <div className='icon-banner'>
                                <i className="fas fa-plus add-to-library"
                                    onClick={this.addToLibrary}></i>
                                <i className="fas fa-share search-share"
                                    onClick={this.recommendToFriend}></i>
                            </div>
                        </div>
                    )

                ) : (

                        <div key={this.props.i} className='br-single-cover'>
                            <img src={this.props.img} alt='book cover' className='br-book-cover' onClick={this.toggle} />
                            <div className='br-icon-banner'>
                                <i className="fas fa-plus br-add-to-library"
                                    onClick={this.addToLibrary}></i>
                                <i className="fas fa-share br-search-share"
                                    onClick={this.recommendToFriend}></i>
                            </div>
                        </div>
                    )}
            </div>
        )

    }
}
