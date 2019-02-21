select * from club as c
join users on c.club_owner = users.user_id
where c.club_id not in
(select club_id from club_members where user_id = $(user_id))