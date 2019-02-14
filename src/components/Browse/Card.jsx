import React, { Component } from 'react';
import Book from '../Book/Book';


import "./Browse.scss";
import './Card.scss';
import './Search.scss';


export default class Card extends Component {
    state = {
        bookModal: false,
        isbn: this.props.isbn
    }

    toggle = () => {
        this.setState({
            bookModal: !this.state.bookModal
        })
    }

    render() {

        return (
            <div className='card-main'>
                {this.state.bookModal ? (
                    <div className='book-modal-container'>

                        <Book
                            isbn={this.state.isbn}
                        />
                        <button className='close-book-modal' onClick={this.toggle}>X</button>
                    </div>
                ) : (
                        null
                    )}
                {this.props.search ? (
                    <div key={this.props.i} className='searched-single-book'>
                        <img src={this.props.img} alt='book cover' className='searched-book-cover' onClick={this.toggle} />
                        <div className='icon-banner'>
                            <i className="fas fa-plus add-to-library"></i>
                            <i className="fas fa-share search-share"></i>
                        </div>
                    </div>

                ) : (

                        <div key={this.props.i} className='br-single-cover'>
                            <img src={this.props.img} alt='book cover' className='br-book-cover' onClick={this.toggle} />
                            <div className='br-icon-banner'>
                                <i className="fas fa-plus br-add-to-library"></i>
                                <i className="fas fa-share br-search-share"></i>
                            </div>
                        </div>
                    )}
            </div>
        )

    }
}
// <div key={i} className='searched-single-book'>
                        //     <Link to={`/book/${book.volumeInfo.industryIdentifiers[0].identifier}`}>
                        //         <img src={book.volumeInfo.imageLinks.thumbnail} alt='book cover' className='searched-book-cover' />
                        //     </Link>
                        //     <div className='icon-banner'>
                        //     <i className="fas fa-plus add-to-library"></i>
                        //     <i className="fas fa-share search-share"></i>
                        //     </div>

                        // </div>