require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const socket = require("socket.io");

const app = express();
const { SERVER_PORT, SERVER_CONNECTION, SESSION_SECRET } = process.env;

// Controllers
const authCtrl = require("./controllers/authController");
const libraryCtrl = require("./controllers/libraryController");
const settingsCtrl = require("./controllers/settingsController");
const friendsCtrl = require("./controllers/friendsController");
const clubsCtrl = require("./controllers/clubsController");
const chatCtrl = require("./controllers/chatController");
const clubLibCtrl = require("./controllers/clubLibraryController");

// Middleware
const userInSession = require("./controllers/middleware/userInSession");

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(userInSession);

// Auth
app.post("/api/register", authCtrl.register);
app.post("/api/login", authCtrl.login);
app.get("/api/session", authCtrl.getUser);
app.get("/api/signout", authCtrl.signout);

// user library
app.post("/library/addBook", libraryCtrl.addBook);
app.post("/library/recommendBook", libraryCtrl.recommendBook);
app.get("/library/allBooks/:user_id", libraryCtrl.allBooks);
app.get("/library/getOneBook/:user_id&:isbn", libraryCtrl.getOneBook);
app.delete("/library/removeBook/:user_library_id&:user_id", libraryCtrl.removeBook);
app.put("/library/updateRating/:user_rating&:user_library_id&:user_id", libraryCtrl.updateRating);
app.put("/library/changeNewStatus/:user_id&:user_library_id", libraryCtrl.changeNewStatus);
app.put("/library/updateBookStatus/:user_id&:user_library_id&:status", libraryCtrl.updateBookStatus);
app.get("/library/getRecommendedLibrary/:user_id", libraryCtrl.getRecommendedLibrary);
app.get("/library/getMyLibrary/:user_id", libraryCtrl.getMyLibrary);

// Settings
app.get("/api/userData/:id", settingsCtrl.getUserData);
app.put("/api/updateAccountStatus/:id", settingsCtrl.updateAccStatus);
app.put('/api/edit-profile', settingsCtrl.editProfile);
app.put('/api/edit-password', settingsCtrl.editPassword);

// Friends
app.get("/api/friendsData/:id", friendsCtrl.getFriends);
app.get("/api/recFriendsData/:id", friendsCtrl.getRecFriends);
app.post("/api/addFriend", friendsCtrl.addFriend);
app.delete("/api/deleteFriend/:userId&:friendId", friendsCtrl.deleteFriend);

//clubs
app.get("/club/getUsersClubs/:user_id", clubsCtrl.getUsersClubs);
app.get("/club/getAllClubs", clubsCtrl.getAllClubs);
app.get("/club/getOneClub/:club_id", clubsCtrl.getOneClub);
app.get("/club/getClubMembers/:club_id", clubsCtrl.getClubMembers);
app.get("/club/getOtherClubs/:user_id", clubsCtrl.getOtherClubs);
app.post("/club/joinClub/:club_id&:user_id", clubsCtrl.joinClub);
app.delete("/club/quitClub/:club_id&:user_id", clubsCtrl.quitClub);
app.post("/club/createNewClub", clubsCtrl.createNewClub);

//club library
app.post("/clubLibrary/recommendBookToClub", clubLibCtrl.recommendBookToClub);
app.get("/clubLibrary/getOneBook/:club_id&:book_isbn", clubLibCtrl.getOneBook);
app.get("/clubLibrary/getClubBooks/:club_id", clubLibCtrl.getClubBooks);

// Chat
app.post("/api/getMessages", chatCtrl.getMessages);
app.post("/api/addMessage", chatCtrl.addMessage);

const io = socket(
  app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`))
);

io.on("connection", socket => {
  socket.on("blast message to general", data => {
    console.log("general socket hit: blast");
    io.sockets.emit("generate general response", data);
  });

  //USER IS TYPING NOTIFICATION
  socket.on("user is typing", data => {
    socket.broadcast.emit("user is typing", data);
  });
  socket.on("user not typing", data => {
    socket.broadcast.emit("user not typing", data);
  });

  //ROOMS SOCKETS
  socket.on("join room", data => {
    socket.join(data.room);
    console.log("joined room ", data.room);
    io.to(data.room).emit("room joined", data);
  });
  socket.on("blast message to room", data => {
    console.log(data);
    console.log("room socket hit: blast", data.room);
    io.to(data.room).emit("generate room response", data);
  });

});

massive(SERVER_CONNECTION)
  .then(connection => {
    app.set("db", connection);
  })
  .catch(err => {
    console.log(err);
  });
