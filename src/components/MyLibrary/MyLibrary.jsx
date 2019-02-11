import React, { Component } from 'react'
import axios from 'axios'
import Book from '../Book/Book'
import './MyLibrary.scss'

export default class Setting extends Component {
  render() {
    return (
      <div>
        <Book />
      </div>
    )
  }
}
