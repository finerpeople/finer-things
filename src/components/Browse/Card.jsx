import React, { Component } from 'react';
import "./Browse.scss";
import './Card.scss'
import Book from '../Book/Book';


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
        console.log(this.state.bookModal)

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
                <div key={this.props.i} className='br-single-cover'>
                    <img src={this.props.img} alt='book cover' className='br-book-cover' onClick={this.toggle} />
                    <div className='br-icon-banner'>
                        <i className="fas fa-plus br-add-to-library"></i>
                        <i className="fas fa-share br-search-share"></i>
                    </div>
                </div>
            </div>
        )

    }
}