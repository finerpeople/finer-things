UPDATE users 
SET 
    first_name = ${firstName},
    last_name = ${lastName},
    email = ${email}
 
where 
    user_id = ${id}

returning *