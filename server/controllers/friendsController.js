module.exports = {
    getFriends: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        const friends = await db.friend.get_friends({id})
        res.status(200).send(friends)
    },
    getRecFriends: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        const recFriends = await db.friend.get_rec_friends({id})
        res.status(200).send(recFriends)
    }
}