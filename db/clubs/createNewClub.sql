INSERT INTO club (club_name, club_owner, summary)
VALUES ($(club_name), $(club_owner), $(summary))
RETURNING *;
