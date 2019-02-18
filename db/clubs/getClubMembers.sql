select c.club_id, c.club_name, c.club_owner, c.summary, u.user_id, u.first_name,
    u.last_name, u.email, u.profile_pic, u.summary
from club as c join club_members as cm on c.club_id = cm.club_id
join users as u on cm.user_id = u.user_id
where c.club_id = $(club_id);