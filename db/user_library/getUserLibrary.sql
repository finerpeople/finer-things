SELECT * 
FROM user_library
WHERE user_id = $(user_id)
ORDER BY date_added DESC, user_library_id DESC;