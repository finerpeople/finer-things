INSERT into user_library (
    user_id,
    book_isbn,
    status,
    user_rating,
    recommend_by,
    date_added,
    book_img,
    book_title,
    book_author,
    book_genre
)
VALUES (
    $(user_id), 
    $(isbn),
    'Recommended',
    0,
    $(friend_id),
    CURRENT_TIMESTAMP,
    $(book_img),
    $(title),
    $(author),
    $(category)
)