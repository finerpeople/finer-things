select *
from users u
where user_id in
	(
		select friend_id
		from friend
		where user_id = ${id}
	)