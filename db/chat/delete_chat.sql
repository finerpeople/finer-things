delete from chat 
where comment_id in (
	select comment_id 
	from comments
)