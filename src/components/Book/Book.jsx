import React, { Component } from 'react'
import axios from 'axios'
import './Book.scss'
import StarRatingComponent from 'react-star-rating-component';

export default class Book extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isbn: props.isbn,
      image: '',
      title: '',
      author: [],
      description: '',
      rating: 0
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    let {isbn} = this.props.match.params;
    console.log(isbn)
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/industryIdentifiers, volumeInfo/categories, volumeInfo/averageRating, volumeInfo/imageLinks, volumeInfo/previewLink)`)
      .then(res => {
        console.log(res.data)
        this.setState( {
          image: res.data.items[0].volumeInfo.imageLinks.thumbnail,
          isbn: isbn,
          title: res.data.items[0].volumeInfo.title,
          author: res.data.items[0].volumeInfo.authors,
          description: res.data.items[0].volumeInfo.description,
          rating: res.data.items[0].volumeInfo.averageRating
        })
      })

  }

  render() {
    // let image = 
    return (
      <div>
        <img src={this.state.image} alt='book cover'/>
        <h1>{this.state.title}</h1>
        {/* <h2>{this.state.rating}</h2> */}
        <StarRatingComponent 
          name="rating" 
          editing={false}
          // renderStarIcon={() => <span></span>}
          starCount={5}
          emptyStarColor={'#5d5c61'} 
          value={this.state.rating}
        />
        <h2>{this.state.author}</h2>
        <p>{this.state.description}</p>
      </div>
    )
  }
}
