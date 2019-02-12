import React, { Component } from 'react'
import axios from 'axios'
import './Browse.scss'

export default class Browse extends Component {
  constructor(props) {
    super(props)
    this.state = {
        books: [],
    }
  }

  async componentDidMount() {
    let books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=40&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/industryIdentifiers, volumeInfo/categories, volumeInfo/averageRating, volumeInfo/imageLinks, volumeInfo/previewLink)
    `).then(res => {
      this.setState({ books: res.data });
      console.log(res.data.items)
      console.log(this.state.books)
  })
}
  
  render() {
    
    return (
      <div>
        
      </div>
    )
  }
}
