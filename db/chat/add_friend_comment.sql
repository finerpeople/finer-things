insert into comments
(
    user_id,
    time_stamp,
    comment
)
values (
    ${userId},
    CURRENT_TIMESTAMP,
    ${message}
)

returning *