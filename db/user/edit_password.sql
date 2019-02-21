UPDATE users 
SET 
    hash = ${hash}
 
where 
    user_id = ${id}

returning *