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
      rating: 0,
      user_id: 0,
      libraryButton: "Add to My Library"
    };
  }

  componentDidMount = async () => {
    await this.getSession();
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
    this.inLibrary()
  };

  getSession = async () => {
    const res = await axios.get("/api/session");
    this.setState({ user_id: res.data.id })
    if (!res.data.loggedIn) {
      this.props.history.push("/");
    }
  };

  inLibrary = async () => {
    let res = await axios.get(`/library/getOneBook/${this.state.user_id}&${this.state.isbn}`)
    if(res.data.length === 0){
      this.setState({
        libraryButton: "Add to My Library"
      })
    } else {
      this.setState({
        libraryButton: "Already in My Library"
      })
    }
  }

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
            <button onClick={this.props.addToLibrary}>{this.state.libraryButton}</button>
          </div>
        </div>
        <div className='book-info-summary flexed'>
          <p className='book-summary'>{this.state.description}</p>
        </div>
      </div>
    )
}
}
