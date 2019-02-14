const bcrypt = require("bcryptjs");

module.exports = {
  login: async (req, res) => {
    const { session } = req;
    const { userEmail, password } = req.body;
    const db = req.app.get("db");
    const userArray = await db.user.get_user({ userEmail });
    if (!userArray[0]) {
      return res.status(401).send({ message: "Email not found" });
    }
    const compareHash = bcrypt.compareSync(password, userArray[0].hash);
    if (!compareHash) {
      return res.status(401).send({ message: "Password incorrect" });
    }
    const {user_id, first_name, status } = userArray[0];
    if(!status) {
      return res.status(200).send({message: 'Account suspended'})
    }
    session.user = {
      id: user_id,
      firstName: first_name,
      loggedIn: true
    };
    res
      .status(200)
      .send({ message: "logged in", userData: session.user, loggedIn: true });
  },
  register: async (req, res) => {
    const { session } = req;
    const { firstName, lastName, userEmail, password } = req.body;
    const db = req.app.get("db");
    const userArray = await db.user.get_user({ userEmail });
    if (userArray[0]) {
      return res.status(200).send({ message: "Email already in use" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await db.user.create_user({
      firstName,
      lastName,
      userEmail,
      hash
    });
    const { user_id, first_name } = newUser[0];

    session.user = {
      id: user_id,
      firstName: first_name,
      loggedIn: true
    };
    res.status(200).send({
      message: "logged in",
      userData: session.user,
      loggedIn: true
    });
  },
  signout: (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "Logged out" });
  },
  getUser: (req, res) => {
    return res.status(200).send(req.session.user);
  }
};
