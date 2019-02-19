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
      libraryButton: "Add to My Library",
      userRating: 0,
      inLibrary: []
    };
  }

  componentDidMount = async () => {
    await this.getSession();
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${
      this.state.isbn
      }&fields=items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/description, volumeInfo/industryIdentifiers, volumeInfo/categories, volumeInfo/averageRating, volumeInfo/imageLinks, volumeInfo/previewLink)`
    );
    // console.log(res.data)
    this.setState({
      image: res.data.items[0].volumeInfo.imageLinks.thumbnail,
      isbn: this.state.isbn,
      title: res.data.items[0].volumeInfo.title,
      author: res.data.items[0].volumeInfo.authors,
      description: res.data.items[0].volumeInfo.description,
      rating: res.data.items[0].volumeInfo.averageRating,
      category: res.data.items[0].volumeInfo.categories[0],
      userRating: this.state.userRating
    });
    await this.inLibrary()
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
    // console.log(res.data)
    console.log({true: this.props.book_status && this.props.book_status !== 'Recommended'})
    if(this.props.myLibrary && this.props.book_status !== 'Recommended') {
      this.setState({
        libraryButton: 'Enjoy reading this book!',
        userRating: res.data[0].user_rating
      })
    } else {
      if (res.data.length === 0 || this.props.book_status === 'Recommended') {
        this.setState({
          libraryButton: "Add to My Library"
        })
      } else {
        this.setState({
          libraryButton: "Already in My Library"
        })
      }
    }
  }

  onStarClick = async (nextValue, prevValue, name) => {
    // console.log(nextValue, prevValue, name)
    await this.setState({ userRating: nextValue })
    // console.log(this.state.userRating)
    let res = await axios.put(`/library/updateRating/${this.state.userRating}&${this.props.user_library_id}&${this.state.user_id}`)
    this.setState({
      userRating: nextValue
    })
    // console.log(res)
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
            {this.state.libraryButton === 'Add to My Library' ? (
              <button className='book-add' onClick={this.props.modalAddToLibrary}>{this.state.libraryButton}</button>
            ) : (
                <button className='book-status'>{this.state.libraryButton}</button>
              )}
            {this.props.myLibrary ? (
              <StarRatingComponent
                name="rating"
                editing={true}
                starCount={5}
                emptyStarColor={'#5d5c61'}
                value={this.state.userRating}
                onStarClick={this.onStarClick}
              />
            ) : (
                <StarRatingComponent
                  name="rating"
                  editing={false}
                  starCount={5}
                  emptyStarColor={'#5d5c61'}
                  value={this.state.rating}
                />
              )}
          <div>
              <button>Share</button>
          </div>
          </div>
        </div>
        <div className='book-info-summary flexed'>
          <p className='book-summary'>{this.state.description}</p>
        </div>
      </div>
    )
  }
}
