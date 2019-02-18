SELECT c.club_id, c.club_name, c.club_owner, c.summary,  cm.user_id, u.first_name, u.last_name, u.email, u.profile_pic
FROM club AS c
JOIN club_members AS cm ON c.club_id = cm.club_id
JOIN users AS u ON c.club_owner = u.user_id
WHERE cm.user_id = $(user_id)
ORDER BY c.club_name;