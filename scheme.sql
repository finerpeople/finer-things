CREATE TABLE USERS (
    user_id  Serial PRIMARY KEY,
    first_name character varying(50),
    last_name character varying(50),
    email character varying(150),
    hash text,
    profile_pic text,
    user_status boolean default true
);

CREATE TABLE USER_LIBRARY (
    user_library_id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES USERS(user_id),
    book_isbn text,
    status text,
    recommend_by integer,
    user_rating integer,
    date_added date,
    book_img text,
    book_title text,
    book_author text,
    book_genre text
);

CREATE TABLE FRIEND (
    friend_id integer REFERENCES USERS(user_id),
    user_id integer NOT NULL REFERENCES USERS(user_id)
);


CREATE TABLE COMMENTS (
    comment_id integer PRIMARY KEY,
    user_id integer NOT NULL REFERENCES USERS(user_id),
    time_stamp date,
    comment text
);


CREATE TABLE CLUB_BOOK (
    club_id integer REFERENCES CLUB(club_id),
    book_isbn text,
    status text,
    recommend_by integer,
    book_img text,
    book_title text,
    book_author text,
    book_genre text
);


CREATE TABLE CLUB (
    club_id integer PRIMARY KEY,
    club_name character varying(150),
    club_owner integer NOT NULL REFERENCES USERS(user_id),
    summary character varying(500)
);

 
CREATE TABLE CHAT (
    comment_id integer NOT NULL REFERENCES COMMENTS(comment_id),
    friend_id integer NOT NULL ,
    club_id integer NOT NULL REFERENCES CLUB(club_id)
);

