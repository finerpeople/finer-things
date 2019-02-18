module.exports = {
  getFriends: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const friends = await db.friend.get_friends({ id });
    res.status(200).send(friends);
  },
  getRecFriends: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const recFriends = await db.friend.get_rec_friends({ id });
    res.status(200).send(recFriends);
  },
  addFriend: async (req, res) => {
    const { userId, friendId } = req.body;
    const db = req.app.get("db");
    let id = userId
    await db.friend.add_friend({ friendId, userId });
    const friends = await db.friend.get_friends({ id });
    const recFriends = await db.friend.get_rec_friends({ id });
    res.status(200).send({friends, recFriends});
  },
  deleteFriend: async (req, res) => {
    const { userId, friendId } = req.params;
    const db = req.app.get("db");
    let id = userId
    await db.friend.delete_friend({userId, friendId})
    const friends = await db.friend.get_friends({ id });
    const recFriends = await db.friend.get_rec_friends({ id });
    res.status(200).send({friends, recFriends});
  }
};
