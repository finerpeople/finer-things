const bcrypt = require('bcryptjs')

module.exports = {
    login: async (req, res) => {

    },
    register: async (req, res) => {
        const {session} = req
        const {firstName, lastName, userEmail, password} = req.body
        const db = req.app.get('db');
        const userArray = await db.user.get_user({ userEmail });
        if(userArray[0]) {
            return res.status(200).send({message: 'Email already in use'})
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = await db.user.create_user({firstName, lastName, userEmail, hash})
        const {user_id, first_name, last_name, email, profile_pic} = newUser[0]

        session.user = {id: user_id, firstName: first_name, lastName: last_name, email, profilePic: profile_pic}
        res.status(200).send({
            message: 'logged in',
            userData: session.user,
            loggedIn: true
        })
    },
    signout: (req, res) => {

    },
    getUser: (req, res) => {
        res.status(200).send(req.session.user)
    }
}