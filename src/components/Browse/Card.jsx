import React, { Component } from 'react';
import Swal from 'sweetalert2';
import Book from '../Book/Book';


import "./Browse.scss";
import './Card.scss';
import './Search.scss';
import axios from 'axios';


export default class Card extends Component {
    state = {
        bookModal: false,
        isbn: this.props.isbn,
        moreModal: false,
        friends: []
    }

    toggle = () => {
        this.setState({
            bookModal: !this.state.bookModal
        })
    }

    moreToggle = () => {
        this.setState({
            moreModal: !this.state.moreModal
        })
    }

    getSingleBook = async () => {
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.isbn}&maxResults=1&langRestrict=en&fields=kind, items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/industryIdentifiers, volumeInfo/categories, volumeInfo/imageLinks)`)
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
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            customClass: 'margin'
          });
          
          Toast.fire({
            type: 'success',
            title: 'Added to My Library'
          })
    }

    modalAddToLibrary = async () => {
        await this.addToLibrary()
        this.toggle()
    }

    getFriends = async () => {
        const friends = await axios.get(`/api/friendsData/${this.props.user_id}`)
        this.setState({
            friends: friends.data
        })
        console.log(this.state.friends)
    }

    recommendToFriend = async (user_id) => {
        const book = await this.getSingleBook();
        // this.getFriends();
        await axios.post('/library/recommendBook', {
            user_id: user_id,
            isbn: this.state.isbn,
            friend_id: this.props.user_id,
            book_img: book.imageLinks.thumbnail,
            title: book.title,
            author: book.authors[0],
            category: book.categories[0]
        })
    }

    deleteBook = () => {
        this.props.deleteBook(this.props.user_library_id)
        this.moreToggle()
    }

    render() {
        let friendsList = this.state.friends.map((friend) => {
            return (
                <div key={friend.user_id}>
                    {/* <img src={friend.profile_pic} alt='friend pic'/> */}
                    <p onClick={() => this.recommendToFriend(friend.user_id)}>{`${friend.first_name} ${friend.last_name}`}</p>
                </div>
            )
        })
        return (
            <div className='card-main'>
                {friendsList}
                {this.state.bookModal ? (
                    <div className='book-modal-container'>
                        <Book
                            isbn={this.state.isbn}
                            modalAddToLibrary={this.modalAddToLibrary}
                            myLibrary={this.props.myLibrary}
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
                                <i className="fas fa-ellipsis-h dots" onClick={this.moreToggle}></i>
                                {this.state.moreModal ? (
                                    <div className='more-modal'
                                        onMouseLeave={this.moreToggle}
                                    >
                                        <div className='more-delete flexed' onClick={this.deleteBook}>
                                            <p className='more-delete-text'>Delete</p>
                                            <i className="far fa-trash-alt book-delete" id='book-delete'></i>
                                        </div>
                                        <div className='more-share flexed'>
                                            <p className='more-share-text'>Share</p>
                                            <i className="fas fa-share my-lib-share"></i>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : (
                            <div key={this.props.i} className='searched-single-book'>
                                <img src={this.props.img} alt='book cover' className='searched-book-cover' onClick={this.toggle} />
                                <div className='icon-banner'>
                                    <i className="fas fa-plus add-to-library"
                                        onClick={this.addToLibrary}></i>
                                    <i className="fas fa-share search-share"
                                        onClick={this.getFriends}></i>
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
                                    onClick={this.getFriends}></i>
                            </div>
                        </div>
                    )}
            </div>
        )

    }
}
