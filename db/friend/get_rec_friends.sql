
select *
from users u
where user_id not in
	(
		select friend_id
		from friend
		where user_id = ${id}
	)