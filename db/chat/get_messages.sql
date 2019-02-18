select * from comments
join chat on chat.comment_id = comments.comment_id
where user_id = ${userId} and friend_id = ${friendId}
order by time_stamp