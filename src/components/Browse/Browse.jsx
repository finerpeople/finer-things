import React, { Component } from "react";
import axios from "axios";
import "./Browse.scss";

const key = process.env.REACT_APP_NYT

export default class Browse extends Component {
  componentDidMount() {
    axios.get('https://www.googleapis.com/books/v1/volumes?q=isbn:9780735219113')
    .then(res => {
      console.log(res.data)
    })
    axios
      .get(
        `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${key}`
      )
      .then(res => {
        console.log(res.data.results.lists);
      });
      // let books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=40&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/industryIdentifiers, volumeInfo/categories, volumeInfo/averageRating, volumeInfo/imageLinks, volumeInfo/previewLink)`)
  }

  render() {
    return (
      <div>
        Here is the Browser
      </div>
    );
  }
}
