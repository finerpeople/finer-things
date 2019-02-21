import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Auth from './components/Auth/Auth'
import MyLibrary from './components/MyLibrary/MyLibrary'
import Book from './components/Book/Book'
import Chat from './components/Chat/Chat'
import Club from './components/Club/Club'
import MyClub from './components/MyClub/MyClub'
import Friend from './components/Friend/Friend'
import Setting from './components/Setting/Setting'
import Search from './components/Browse/Search';

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/my-library' component={MyLibrary} />
        <Route path='/book/:isbn' component={Book} />
        <Route path='/browse' component={Search} />
        <Route path='/chat' component={Chat} />
        <Route path='/club/:club_id' component={Club} />
        <Route path='/friends' component={Friend} />
        <Route path='/my-clubs' component={MyClub} />
        <Route path='/settings' component={Setting} />
    </Switch>
)