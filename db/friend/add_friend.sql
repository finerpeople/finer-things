insert into friend
(
    friend_id,
    user_id
)
values (
    $(friendId),
    $(userId)
)

returning *

