INSERT into user_library (
    user_id,
    book_isbn,
    status,
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
    $(friend_id),
    CURRENT_DATE,
    $(book_img),
    $(title),
    $(author),
    $(category)
)