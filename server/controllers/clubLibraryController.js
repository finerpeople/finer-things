module.exports = {
    recommendBookToClub: async (req, res) => {
        const {club_id, book_isbn, user_id, book_img, book_title, book_author, book_genre} = req.body;
        const db = req.app.get('db');
        let book = await db.club_library.getOneBook({club_id, book_isbn})
        if(book.length > 0) {
            res.status(200).send({message: "inLibrary"})
        } else {
            let recommendBookToClub = await db.club_library.recommendBookToClub({club_id, book_isbn, user_id, book_img, book_title, book_author, book_genre})
            res.status(200).send(recommendBookToClub)
        }
    },
    getOneBook: async (req, res) => {
        const {club_id, book_isbn} = req.params;
        const db = req.app.get('db');
        let oneBook = await db.club_library.getOneBook({club_id, book_isbn})
        res.status(200).send(oneBook)
    },
    getClubBooks: async (req, res) => {
        const {club_id} = req.params;
        const db = req.app.get('db');
        let clubBooks = await db.club_library.getClubBooks({club_id})
        res.status(200).send(clubBooks)
    },
    deleteClubBook: async (req, res) => {
        const {club_book_id, club_id} = req.params;
        const db = req.app.get('db');
        await db.club_library.deleteClubBook({club_book_id})
        let clubBooks = await db.club_library.getClubBooks({club_id})
        res.status(200).send(clubBooks)
    }
}