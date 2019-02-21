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
        friends: [],
        myClubs: [],
        toggleShare: false
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

    toggleShare = async () => {
        this.setState({
            toggleShare: !this.state.toggleShare
        })
        await this.getPeopleToShareWith()
    }

    getSingleBook = async () => {
        let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.isbn}&maxResults=1&langRestrict=en&fields=kind, items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/industryIdentifiers, volumeInfo/categories, volumeInfo/imageLinks)`)
        return res.data.items[0].volumeInfo
    }

    

    addToLibrary = async () => {
        const book = await this.getSingleBook();
        // console.log(book)
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

    getPeopleToShareWith = async () => {
        this.getFriends()
        this.getUsersClubs()
    }

    getFriends = async () => {
        const friends = await axios.get(`/api/friendsData/${this.props.user_id}`)
        this.setState({
            friends: friends.data
        })
    }

    getUsersClubs = async () => {
        const myClubs = await axios.get(`/club/getUsersClubs/${this.props.user_id}`)
        this.setState({ myClubs: myClubs.data })
    }

    recommendToFriend = async (user_id) => {
        const book = await this.getSingleBook();
        await axios.post('/library/recommendBook', {
            user_id: user_id,
            isbn: this.state.isbn,
            friend_id: this.props.user_id,
            book_img: book.imageLinks.thumbnail,
            title: book.title,
            author: book.authors[0],
            category: book.categories[0]
        })
        // this.toggleShare()
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            customClass: 'margin'
        });

        Toast.fire({
            type: 'success',
            title: 'Book Shared'
        })
    }

    deleteBook = () => {
        this.props.deleteBook(this.props.user_library_id)
        this.moreToggle()
    }

    addRecommendedBook = () => {
        this.props.addRecommended(this.props.user_id, this.props.user_library_id)
    }
    

    render() {
        // console.log(() => this.props.addRecommended(5, 257))
        let friendsList = this.state.friends.map((friend) => {
            return (
                <div className='share-list-names-container' key={friend.user_id}>
                    <button className='share-list-buttons' onClick={() => this.recommendToFriend(friend.user_id)}>
                        <div className='share-img-div' style={{ backgroundImage: `url(${friend.profile_pic})` }}></div>
                        <p className='share-list-name'>
                            {`${friend.first_name} ${friend.last_name}`}
                        </p>
                    </button>
                </div>
            )
        })
        let myClubsList = this.state.myClubs.map((club, i) => {
            return (
                <div className='share-list-names-container' key={i}>
                    <button className='share-list-buttons'>
                        <div className='share-img-div' style={{ backgroundImage: `url(${club.profile_pic})` }}></div>
                        <p className='share-list-name'>
                            {club.club_name}
                        </p>
                    </button>
                </div>
            )
        })
        return (
            <div className='card-main' >
                {this.state.bookModal ? (
                    <div className='book-modal-container'>
                        <Book
                            isbn={this.state.isbn}
                            modalAddToLibrary={this.modalAddToLibrary}
                            myLibrary={this.props.myLibrary}
                            user_library_id={this.props.user_library_id}
                            book_status={this.props.book_status}
                            addRecommendedBook={this.addRecommendedBook}
                            getPeopleToShareWith={this.getPeopleToShareWith}
                            myClubsList={myClubsList}
                            friendsList={friendsList}
                            toggleShare={this.state.toggleShare}
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
                            {this.props.book_status === 'New' ? (
                                <div className='card-status'>
                                    {this.props.book_status}
                                </div>
                            ) : null}
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
                                        <div className='more-share flexed' onClick={this.toggleShare}>
                                            <p className='more-share-text'>Share</p>
                                            <i className="fas fa-share my-lib-share"></i>
                                        </div>
                                    </div>
                                ) : null}
                                {this.props.book_status === 'Recommended' ? (
                                    <i className="fas fa-plus" id='recommended-add-to-library'
                                        onClick={this.addRecommendedBook}></i>
                                ) : null}
                            </div>
                            {this.state.toggleShare ? (
                                <div className='share-list-container'
                                    onMouseLeave={this.toggleShare}
                                >
                                    <div className='share-list'>
                                        <p className='share-list-title'>Friends: </p>
                                        {friendsList}
                                        <p className='share-list-title'>My Clubs: </p>
                                        {myClubsList}
                                    </div>
                                    <div className='close-share-list'>
                                        <button className='close-share-list-button' onClick={this.toggleShare}>X</button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    ) : (
                            <div key={this.props.i} className='searched-single-book'>
                                <img src={this.props.img} alt='book cover' className='searched-book-cover' onClick={this.toggle} />
                                <div className='icon-banner'>
                                    <i className="fas fa-share search-share"
                                        onClick={this.toggleShare}></i>
                                </div>
                                {this.state.toggleShare ? (
                                    <div className='share-list-container'
                                        onMouseLeave={this.toggleShare}
                                    >
                                        <div className='share-list'>
                                            <p className='share-list-title'>Friends: </p>
                                            {friendsList}
                                            <p className='share-list-title'>My Clubs: </p>
                                            {myClubsList}
                                        </div>
                                        <div className='close-share-list'>
                                            <button className='close-share-list-button' onClick={this.toggleShare}>X</button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        )

                ) : (
                        <div key={this.props.i} className='br-single-cover'>
                            <img src={this.props.img} alt='book cover' className='br-book-cover' onClick={this.toggle} />
                            <div className='br-icon-banner'>
                                <i className="fas fa-plus br-add-to-library"
                                    onClick={this.addToLibrary}></i>
                                <i className="fas fa-share br-search-share"
                                    onClick={this.toggleShare}
                                ></i>
                            </div>
                            {this.state.toggleShare ? (
                                <div className='share-list-container'
                                    onMouseLeave={this.toggleShare}
                                >
                                    <div className='share-list'>
                                        <p className='share-list-title'>Friends: </p>
                                        {friendsList}
                                        <p className='share-list-title'>My Clubs: </p>
                                        {myClubsList}
                                    </div>
                                    <div className='close-share-list'>
                                        <button className='close-share-list-button' onClick={this.toggleShare}>X</button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}
            </div>
        )

    }
}
