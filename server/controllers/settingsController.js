module.exports = {
    getUserData: async (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        const userData = await db.user.get_user_data({id})
        return res.status(200).send(userData[0])
    },
    deleteAccount: async (req, res) => {
        const { id } = req.params;
        const status = false
        const db = req.app.get('db')
        await db.user.delete_user({status, id})
        res.status(200).send({res, message: 'User Deleted'})
    },
}