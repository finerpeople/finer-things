import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ClubCard.scss';

export default class ClubCard extends Component {
    state = {
        button: this.props.button,
        toggleClubDetails: false
    }
    toggle = () => {
        this.setState({ toggleClubDetails: !this.setState.toggleClubDetails })
    }

    render() {
        return (
            <div className='club-card flexed' >
                <Link style={{ textDecoration: 'none' }} to={`/club/${this.props.clubId}`}>
                    <div className='club-card-pic-div' style={{ backgroundImage: `url(${this.props.profilePic})` }}></div>
                    <p className='club-card-title'>{this.props.clubName}</p>
                    <p className='club-card-info'>{this.props.firstName} {this.props.lastName}</p>
                </Link>
                <button onClick={() => this.props.joinRemoveFn(this.props.clubId)}>{this.state.button}</button>
            </div>
        )
    }
}