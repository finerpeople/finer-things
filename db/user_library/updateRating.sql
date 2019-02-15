UPDATE user_library 
SET user_rating = $(user_rating) 
WHERE user_library_id = $(user_library_id);

SELECT * 
FROM user_library
WHERE user_id = $(user_id)
ORDER BY date_added DESC, user_library_id DESC;