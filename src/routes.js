import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Auth from './components/Auth/Auth'
import MyLibrary from './components/MyLibrary/MyLibrary'
import Book from './components/Book/Book'
import Browse from './components/Browse/Browse'
import Chat from './components/Chat/Chat'
import Club from './components/Club/Club'
import MyClub from './components/MyClub/MyClub'
import Friend from './components/Friend/Friend'
import Setting from './components/Setting/Setting'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/my-library' component={MyLibrary} />
        <Route path='/book/:isbn' component={Book} />
        <Route path='/browse' component={Browse} />
        <Route path='/chat' component={Chat} />
        <Route path='/club' component={Club} />
        <Route path='/friend' component={Friend} />
        <Route path='/my-club' component={MyClub} />
        <Route path='/setting' component={Setting} />
    </Switch>
)