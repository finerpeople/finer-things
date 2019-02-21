INSERT INTO club_book (
    club_id,
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
    $(club_id),
    $(book_isbn),
    'Recommended',
    $(user_id),
    CURRENT_TIMESTAMP,
    $(book_img),
    $(book_title),
    $(book_author),
    $(book_genre)
)
RETURNING *