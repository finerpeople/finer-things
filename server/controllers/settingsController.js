const bcrypt = require("bcryptjs");

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
    const { id, firstName, lastName, email, } = req.body;
    // console.log(req.body)
    const db = req.app.get("db");
    let updatedUser = await db.user.edit_profile({
      id,
      firstName,
      lastName,
      email
    });
    res.status(200).send(updatedUser);
  },
  editPassword: async (req, res) => {
    const {id, password} = req.body;
    // console.log(password)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const db = req.app.get('db');
    // console.log(hash)
    let updatedPassword = await db.user.edit_password({
      id,
      hash
    });
    res.status(200).send(updatedPassword)
  }
};
