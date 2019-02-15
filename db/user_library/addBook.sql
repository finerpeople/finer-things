INSERT into user_library (
    user_id,
    book_isbn,
    status,
    user_rating,
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
    0,
    CURRENT_TIMESTAMP,
    $(book_img),
    $(title),
    $(author),
    $(category)
)