UPDATE user_library
SET status = 'New',
    date_added = CURRENT_TIMESTAMP
WHERE user_library_id = $(user_library_id);