import React, { Component } from 'react';

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
            <>
                {this.state.bookModal ? (
                    <div>
                        
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
            </>
        )

    }
}