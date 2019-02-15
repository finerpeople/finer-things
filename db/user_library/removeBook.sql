DELETE FROM user_library 
    WHERE user_library_id = $(user_library_id);

SELECT * FROM user_library
    WHERE user_id = $(user_id);
