update users set user_status = ${status} WHERE user_id=${id}

returning *