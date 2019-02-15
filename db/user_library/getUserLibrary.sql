SELECT * 
FROM user_library
WHERE user_id = $(user_id)
ORDER BY date_added desc;