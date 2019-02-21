SELECT * 
FROM user_library
WHERE user_id = $(user_id) AND status = 'Recommended'
ORDER BY date_added DESC, user_library_id DESC;