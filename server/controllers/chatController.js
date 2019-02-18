module.exports = {
  getMessages: async (req, res) => {
    const { userId, friendId } = req.body;
    const db = req.app.get("db");
    const userMessages = await db.chat.get_messages({userId, friendId});
    res.status(200).send(userMessages)
  },
  addMessage: async (req, res) => {
    const { userId, friendId, message } = req.body;
    const db = req.app.get("db");
    const comment = await db.chat.add_friend_comment({userId, message})
    const commentId = comment[0].comment_id
    await db.chat.add_friend_message({ commentId, friendId });
    const userMessages = await db.chat.get_messages({userId, friendId});
    res.status(200).send(userMessages)
  }
};
