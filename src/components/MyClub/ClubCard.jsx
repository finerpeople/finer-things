import React, {Component} from 'react';

import './ClubCard.scss';

export default class ClubCard extends Component {
    render () {
        return (
            <div className='club-card' key={this.props.clubId}>
                <h1 className='club-card-title'>{this.props.clubName}</h1>
                <div className='club-card-info'>
                    <div className='club-card-pic-div' style={{ backgroundImage: `url(${this.props.profilePic})` }}></div>
                    {this.props.firstName} {this.props.lastName}
                </div>
            </div>
        )
    }
}