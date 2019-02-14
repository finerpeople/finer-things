INSERT into user_library (
    user_id,
    book_isbn,
    status,
    date_added,
    book_img,
    book_title,
    book_author,
    book_genre
)
VALUES (
    $(user_id),
    $(isbn),
    'New',
    CURRENT_DATE,
    $(book_img),
    $(title),
    $(author),
    $(category)
)