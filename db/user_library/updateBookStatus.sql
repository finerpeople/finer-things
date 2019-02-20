UPDATE user_library
SET status = $(status)
WHERE user_library_id = $(user_library_id);
