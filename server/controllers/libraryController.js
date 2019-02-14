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
        if(book.length > 0){
            // console.log('book exists')
            // if in library return message
            res.status(200).send({message: "inLibrary"});
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
}