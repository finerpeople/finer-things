select * from comments
join chat on chat.comment_id = comments.comment_id
where (user_id = ${userId} and friend_id = ${friendId}) or (user_id = ${friendId} and friend_id = ${userId})
order by time_stamp