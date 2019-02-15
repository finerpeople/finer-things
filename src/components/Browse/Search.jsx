import React, { Component } from 'react';
import Fiction from './Fiction';
import Nonfiction from './Nonfiction';
import Misc from './Misc';
import YoungAdult from './YoungAdult';
import axios from 'axios';
import Card from './Card';

import "./Search.scss";


export default class Search extends Component {
    state = {
        userInput: '',
        searchedBooks: [],
        toggleSearch: false,
        user_id: 0
    }
    async componentDidMount() {
        await this.getSession();    
    }

    getSession = async () => {
        const res = await axios.get("/api/session");
        this.setState({
          user_id: res.data.id
        })
      };

    handleChange = (prop, val) => {
        this.setState({
            [prop]: val
        })
    }

    toggle = () => {
        // window.scrollTo(0, 0)
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
                <div key={i}>
                    {book.volumeInfo.imageLinks && book.volumeInfo.industryIdentifiers ? (
                        <Card 
                        i={i}
                        img={book.volumeInfo.imageLinks.thumbnail}
                        isbn={book.volumeInfo.industryIdentifiers[0].identifier}
                        search={true}
                        user_id={this.state.user_id}
                        />
                    ) : (null)
                    }
                </div>
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