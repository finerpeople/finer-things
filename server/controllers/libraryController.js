module.exports = {
    addBook: async (req, res) => {
        console.log(req.body)
        const { user_id, isbn, book_img, title, author, category } = req.body
        // const db = req.app.get("db");
    },
}