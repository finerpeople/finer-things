UPDATE users 
SET 
    first_name = ${firstName},
    last_name = ${lastName},
    summary = ${summary},
    email = ${email}, 
    hash = ${password}
where 
    user_id = ${id}

returning *