import React, {Component} from 'react';

import './ClubCard.scss';

export default class ClubCard extends Component {
    state = {
        button: this.props.button
    }
    render () {
        return (
            <div className='club-card' >
                <h3 className='club-card-title'>{this.props.clubName}</h3>
                <div className='club-card-info'>
                    <div className='club-card-pic-div' style={{ backgroundImage: `url(${this.props.profilePic})` }}></div>
                    {this.props.firstName} {this.props.lastName}
                </div>
                <button onClick={() => this.props.joinRemoveFn(this.props.clubId)}>{this.state.button}</button>
            </div>
        )
    }
}