module.exports = {
    getUsersClubs: async (req, res) => {
        const {user_id } = req.params;
        const db = req.app.get('db');
        let clubs = await db.clubs.getUsersClubs({user_id: user_id})
        res.status(200).send(clubs)
    },
    getAllClubs: async (req, res) => {
        const db = req.app.get('db');
        let clubs = await db.clubs.getAllClubs()
        res.status(200).send(clubs)
    },
    getOneClub: async (req, res) => {
        const { club_id } = req.params;
        const db = req.app.get('db');
        let club = await db.clubs.getOneClub({ club_id });
        res.status(200).send(club)
    },
    getClubMembers: async (req, res) => {
        const { club_id } = req.params;
        const db = req.app.get('db');
        let clubMembers = await db.clubs.getClubMembers({club_id});
        res.status(200).send(clubMembers)
    },
    getOtherClubs: async (req, res) => {
        const {user_id} = req.params;
        const db = req.app.get('db');
        let otherClubs = await db.clubs.getOtherClubs({user_id});
        res.status(200).send(otherClubs)
    },
    joinClub: async (req, res) => {
        const {club_id, user_id} = req.params;
        const db = req.app.get('db');
        await db.clubs.joinClub({club_id, user_id})
        let clubs = await db.clubs.getUsersClubs({user_id: user_id})
        res.status(200).send(clubs)
    }
}