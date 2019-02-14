import React, { Component } from "react";
import axios from "axios";
import "./Book.scss";
import StarRatingComponent from "react-star-rating-component";

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isbn: props.isbn,
      image: "",
      title: "",
      author: [],
      description: "",
      rating: 0
    };
  }

  componentDidMount = async () => {
    this.getSession();
    window.scrollTo(0, 0);
    // let { isbn } = this.props.match.params;
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${
        this.state.isbn
      }&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/industryIdentifiers, volumeInfo/categories, volumeInfo/averageRating, volumeInfo/imageLinks, volumeInfo/previewLink)`
    );
    this.setState({
      image: res.data.items[0].volumeInfo.imageLinks.thumbnail,
      isbn: this.state.isbn,
      title: res.data.items[0].volumeInfo.title,
      author: res.data.items[0].volumeInfo.authors,
      description: res.data.items[0].volumeInfo.description,
      rating: res.data.items[0].volumeInfo.averageRating,
      category: res.data.items[0].volumeInfo.categories[0]
    });
    console.log(this.state);
  };

  getSession = async () => {
    const res = await axios.get("/api/session");
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className='book-info-main flexed'>
        <div className='modal-top flexed'>
          <div className='book-info-img flexed'>
            <img src={this.state.image} alt='book cover' />
          </div>
          <div className='book-info-header flexed'>
            <p className='book-title'>{this.state.title}</p>
            <p className='book-author'>{this.state.author}</p>
            <StarRatingComponent
              name="rating"
              editing={false}
              starCount={5}
              emptyStarColor={'#5d5c61'}
              value={this.state.rating}
            />
          </div>
        </div>
        <div className='book-info-summary flexed'>
          <p className='book-summary'>{this.state.description}</p>
        </div>
      </div>
    )
}
}
