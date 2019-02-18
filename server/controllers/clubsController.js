module.exports = {
    getUsersClubs: async (req, res) => {
        const {user_id } = req.params;
        const db = req.app.get('db');
        let clubs = await db.clubs.getUsersClubs({user_id: user_id})
        res.status(200).send(clubs)
    }
}