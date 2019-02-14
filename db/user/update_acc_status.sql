update users set user_status = not user_status WHERE user_id=${id}

returning *