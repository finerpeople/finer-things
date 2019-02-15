import React, { Component } from "react";
import Fiction from "./Fiction";
import Nonfiction from "./Nonfiction";
import Misc from "./Misc";
import YoungAdult from "./YoungAdult";
import axios from "axios";
import Card from "./Card";

import "./Search.scss";

export default class Search extends Component {
  state = {
    userInput: "",
    searchedBooks: [],
    toggleSearch: false
  };

  handleChange = (prop, val) => {
    this.setState({
      [prop]: val
    });
  };

  toggle = () => {
    // window.scrollTo(0, 0)
    this.setState({
      toggleSearch: !this.state.toggleSearch
    });
  };

  searchBooks = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${this.state.userInput}
            &maxResults=40&langRestrict=en&fields=kind, totalItems, items(id, volumeInfo/title, 
            volumeInfo/authors, volumeInfo/description, volumeInfo/industryIdentifiers, 
            volumeInfo/categories, volumeInfo/averageRating, volumeInfo/imageLinks, 
            volumeInfo/previewLink)`
      )
      .then(res => {
        this.setState({
          searchedBooks: res.data.items,
          userInput: ""
        });
      });
    this.toggle();
  };

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
            />
          ) : null}
        </div>
      );
    });
    return (
      <>
        {this.state.toggleSearch ? (
          <div className="searched-books">
            {displaySearch}
            <div className="back-container">
              <i
                className="fas fa-arrow-left back-button"
                onClick={this.toggle}
              />
            </div>
          </div>
        ) : (
          <>
            <label className="search-header">
              <div className="app-input-container">
                <input
                  className="app-input"
                  type="text"
                  placeholder="Search"
                  onChange={e => this.handleChange("userInput", e.target.value)}
                  value={this.state.userInput}
                />
              </div>
              <div className="browse-header-btn">
                <div className="app-input-container">
                  <i className="fas fa-search" onClick={this.searchBooks} />
                </div>
              </div>
            </label>
            <Fiction />
            <Nonfiction />
            <Misc />
            <YoungAdult />
          </>
        )}
      </>
    );
  }
}
