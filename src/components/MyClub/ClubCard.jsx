import React, { Component } from 'react';
import {Link} from 'react-router-dom';

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
            <div className='club-card' >
                <Link to={`/club/${this.props.clubId}`}>
                    <h3 className='club-card-title'>{this.props.clubName}</h3>
                    <div className='club-card-info'>
                        <div className='club-card-pic-div' style={{ backgroundImage: `url(${this.props.profilePic})` }}></div>
                        {this.props.firstName} {this.props.lastName}
                    </div>
                </Link>
                <button onClick={() => this.props.joinRemoveFn(this.props.clubId)}>{this.state.button}</button>
            </div>
        )
    }
}