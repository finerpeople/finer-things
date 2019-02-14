require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const bcrypt = require('bcryptjs')
// const controller = require('./controller');

const app = express()
const {SERVER_PORT, SERVER_CONNECTION, SESSION_SECRET} = process.env

// Controllers
const authCtrl = require('./controllers/authController');
const libraryCtrl = require('./controllers/libraryController');
const settingsCtrl = require('./controllers/settingsController')

// Middleware
const userInSession = require('./controllers/middleware/userInSession')

app.use(express.json())
app.use(session({
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(userInSession)

// Auth
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/session', authCtrl.getUser)
app.get('/api/signout', authCtrl.signout)

// user library
app.post('/library/addBook', libraryCtrl.addBook);
app.post('/library/recommendBook', libraryCtrl.recommendBook);
app.get('/library/allBooks', libraryCtrl.allBooks);

// Settings
app.get('/api/userData/:id', settingsCtrl.getUserData)
app.put('/api/updateAccountStatus/:id', settingsCtrl.updateAccStatus)


massive(SERVER_CONNECTION)
	.then(connection => {
		app.set('db', connection)
		app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
})
.catch((err) => {console.log(err)})
