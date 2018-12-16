const express = require("express"); //backend framework
const mongoose = require("mongoose"); //orm to interact with mongo db database
//we get the name of the post from the request
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users"); // there are the routes
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");

const app = express();

// bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //acces to request.body.whatitis in he routes

//DB config
const db = require("./config/keys").mongoURI; //so we have the mongo uri

//connection with mongo db
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongoDB Connected.."))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello there"));

//passport middleware
app.use(passport.initialize());
// Passport Config   --- now here will be a jwt straegy
// as strategy in ./passport.js needs passport object
require("./config/passport")(passport);

//use routes
app.use("/api/users", users); // anithing that goes to api/items should refer to the items variable,... which is the file
app.use("/api/posts", posts); // use as route api/post the post file specified
app.use("/api/profile", profile);
// if none on this are been hit then look ath the build folder html
if (process.env.NODE_ENV === "production") {
  // check if it is in heroku, production
  // set a static folder
  app.use(express.static("client/build"));
  // create route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
}

// (run server) create a variable for the port to use, for using huroku
const port = process.env.PORT || 5000;

app.listen(port, console.log(`server started on port: ${port}`));
// the callback function is optional
