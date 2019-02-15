module.exports = {
    addBook: async (req, res) => {
        // console.log(req.body)
        const { user_id, isbn, book_img, title, author, category } = req.body
        const db = req.app.get("db");
        //query database to see if already in library
        let book = await db.user_library.getOneBook({
            user_id,
            isbn
        })
        if (book.length > 0) {
            // console.log('book exists')
            // if in library return message
            res.status(200).send({ message: "inLibrary" });
        } else {
            // else add to library
            let response = await db.user_library.addBook({
                user_id,
                isbn,
                book_img,
                title,
                author,
                category
            });
            res.status(200).send(response);
        }
    },
    recommendBook: async (req, res) => {
        //friend_id is user logged in user_id is user book recommended to
        const { user_id, isbn, friend_id, book_img, title, author, category } = req.body;
        const db = req.app.get('db');
        //query database to see if already in friends library
        let book = await db.user_library.getOneBook({
            user_id,
            isbn
        })
        if (book.length > 0) {
            // console.log('book exists')
            // if in library return message
            res.status(200).send({ message: "inLibrary" });
        } else {
            // else add to friends library
            let response = await db.user_library.recommendBook({
                user_id,
                isbn,
                friend_id,
                book_img,
                title,
                author,
                category
            });
            res.status(200).send(response);
        }
    },
    allBooks: async (req, res) => {
        const { user_id } = req.params;
        const db = req.app.get('db');
        let bookList = await db.user_library.getUserLibrary({ user_id });
        res.status(200).send(bookList)
    },
    getOneBook: async (req, res) => {
        const { user_id, isbn } = req.params;
        const db = req.app.get('db');
        let book = await db.user_library.getOneBook({
            user_id,
            isbn
        })
        res.status(200).send(book)
    },
    removeBook: async (req, res) => {
        const { user_library_id, user_id } = req.params;
        const db = req.app.get('db');
        let removedBook = await db.user_library.removeBook({
            user_library_id,
            user_id
        })
        res.status(200).send(removedBook)
    },
    updateRating: async (req, res) => {
        const { user_rating, user_library_id, user_id } = req.params;
        const db = req.app.get('db');
        let updated = await db.user_library.updateRating({
            user_rating, 
            user_library_id,
            user_id
        })
        res.status(200).send(updated)
    }
}