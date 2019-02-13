require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const bcrypt = require('bcryptjs')
const controller = require('./controller');


const app = express()
const {SERVER_PORT, SERVER_CONNECTION, SESSION_SECRET} = process.env

app.use(express.json())
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))



massive(SERVER_CONNECTION)
	.then(connection => {
		app.set('db', connection)
		app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})
.catch((err) => {console.log(err)})

app.delete('/api/deleteAccount/:id', controller.deleteAccount)