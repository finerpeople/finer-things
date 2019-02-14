SELECT * FROM user_library WHERE 
    user_id = $(user_id) AND
    book_isbn = $(isbn);