UPDATE users 
SET email = ${email}, 
    hash = ${hash}, 
where 
    user_id = ${id}