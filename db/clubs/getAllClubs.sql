SELECT c.club_id, c.club_name, c.club_owner, c.summary, u.first_name, u.last_name, u.email, u.profile_pic
FROM club AS c
JOIN users AS u ON c.club_owner = u.user_id
ORDER BY c.club_name;