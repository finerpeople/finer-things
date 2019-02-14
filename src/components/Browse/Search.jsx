import React, { Component } from 'react';
import Fiction from './Fiction';
import Nonfiction from './Nonfiction';
import Misc from './Misc';
import YoungAdult from './YoungAdult';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./Search.scss";


export default class Search extends Component {
    state = {
        userInput: '',
        searchedBooks: [],
        toggleSearch: false
    }

    handleChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }

    toggle = () => {
        window.scrollTo(0, 0)
        this.setState({
            toggleSearch: !this.state.toggleSearch
        })
    }

    searchBooks = () => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${this.state.userInput}
            &maxResults=40&langRestrict=en&fields=kind, totalItems, items(id, volumeInfo/title, 
            volumeInfo/authors, volumeInfo/description, volumeInfo/industryIdentifiers, 
            volumeInfo/categories, volumeInfo/averageRating, volumeInfo/imageLinks, 
            volumeInfo/previewLink)`).then(res => {
            this.setState({
                searchedBooks: res.data.items,
                userInput: ''
            })
        })
    }

    render() {
        let displaySearch = this.state.searchedBooks.map((book, i) => {
            return (
                <>
                    {book.volumeInfo.imageLinks && book.volumeInfo.industryIdentifiers ? (
                        <div key={i} className='searched-single-book'>
                            <Link to={`/book/${book.volumeInfo.industryIdentifiers[0].identifier}`}>
                                <img src={book.volumeInfo.imageLinks.thumbnail} className='searched-book-cover' />
                            </Link>
                            <div className='icon-banner'>
                            <i className="fas fa-plus add-to-library"></i>
                            <i className="fas fa-share search-share"></i>
                            </div>

                        </div>
                    ) : (null)
                    }
                </>
            )
        })
        return (
            <>
                {this.state.toggleSearch ? (
                    <div className='searched-books'>
                        {displaySearch}
                        <div className='back-container'>
                            <i className="fas fa-arrow-left back-button" onClick={this.toggle}></i>
                        </div>
                    </div>
                ) : (
                        <>
                            <label className='search'>
                                <input
                                    className='search-input'
                                    onChange={(e) => this.handleChange('userInput', e.target.value)}
                                    value={this.state.userInput}
                                />
                                <span onClick={this.toggle}>
                                    <i className="fas fa-search br-search-icon" onClick={this.searchBooks} ></i>
                                </span>
                            </label>
                            <Fiction />
                            <Nonfiction />
                            <Misc />
                            <YoungAdult />
                        </>
                    )}
            </>
        )
    }
}