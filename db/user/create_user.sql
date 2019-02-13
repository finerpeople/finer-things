insert into users
(
    first_name, 
    last_name, 
    email,
    hash
)
values (
    $(firstName),
    $(lastName),
    $(userEmail),
    $(hash)
)

returning *