module.exports = {
  getUserData: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let userData = await db.user.get_user_data({ id });
    return res.status(200).send(userData[0]);
  },
  updateAccStatus: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    let userData = await db.user.update_acc_status({ id });
    res.status(200).send(userData);
  },
  editProfile: async (req, res) => {
    const { id, summary, firstName, lastName, email, password } = req.body; 
    const db = req.app.get('db');
    let updatedUser = await db.user.edit_profile({ id: id, summary: summary, firstName: firstName, lastName: lastName, email: email, password: password });
    res.status(200).send(updatedUser);
  }
};
