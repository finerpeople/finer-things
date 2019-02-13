module.exports = {
    deleteAccount: async (req, res) => {
        const { id } = req.params;
        const db = await req.app.get('db')
        db.delete_user({id: id}).then(response => res.status(200).send(response))
    },
}