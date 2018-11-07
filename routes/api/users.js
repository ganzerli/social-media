const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegistrationInput = require("../../validation/registerRoules");
const validateLoginInput = require("../../validation/loginRoules");

// as strategy in ./passport.js needs passport object
require("../../config/passport")(passport); //now it is also in the server.js

//user model
const User = require("../../models/User");

/// USING GIT-BASH INSTALLED WITH SSL GIVES PROBLEMS OF SECURITY
//@route GET api/users/test
//@description Get all
//@access Public
router.get("/test", (req, res) => {
  res.json({ msg: "users get modified" });
});

//@route GET api/users/register
//@description Get all
//@access Public
router.post("/register", (req, res) => {
  // pulling out errors if is valid from the input
  const { errors, isValid } = validateRegistrationInput(req.body); //this function returns an object with those key names
  // errors is an object, can collect issues and display the whOLE object, updated part, existin so the user get a res back with it
  if (!isValid) {
    // set in the function if there are not errors isValid is true
    return res.status(400).json({ errors }); // send the entire errors object
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "email already exists";
      // is already set
      return res.status(400).json({ errors });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //img Size
        r: "pg", //rating
        d: "mm" //default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      }); //num of chars 10

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(userCreated => res.json(userCreated)) //that is the response from the server
            .catch(err => res.json(err)); //          //in mlab.clm the mongoDb has the new
        }); //                                           //record as the user get registered
      }); //                                             //and here is the response given back
    } //end if                                          //res.json(userCreated)
  });
});

////        V  A  L  I  D  A  T  I  O  N                V  A  L  I  D  A  T  I  O  N

//@route GET api/login
//@description Get all
//@access Private
router.post("/login", (req, res) => {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;

  const { errors, isValid } = validateLoginInput({
    email: reqEmail,
    password: reqPassword
  });
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //when form is submit infos will be sent in req.body .. using bodyparser
  //find user from the email
  User.findOne({ email: reqEmail }).then(user => {
    // Obj
    if (!user) {
      //in case the user is not found ==false we send an error status of not found, and an error called email
      errors.email = "user not found";
      return res.status(404).json(errors);
    }
    // if user is registered just go further for the password
    bcrypt.compare(reqPassword, user.password).then(isThere => {
      // to find if the password matches
      // match the password, the user password is plain text, compare with bcrypt
      if (isThere) {
        //sign the webtoken, it takes a payload as user information to know which user it is and an expiration
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // JWT payload, when user found id name and avatar given as payload
        jwt.sign(
          payload, // see strategy, the payload is used to pick up the user object per id
          keys.aSuperSecretKey,
          { expiresIn: 9000 }, //bit > day
          (err, token) => {
            //makes the token and gives it back as response
            res.json({
              jwTokenOk: true,
              token: "Bearer " + token //                ##### if everything is ok response gives the token back
            }); //                                       ##### going to the /current giving the auth token
          } //                                           ###### the server can know what user it is because of the PAYLOAD
        ); //                                           ###### /config/passport.js
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route GET api/users/currentuser
//@description Get all
//@access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }), //this is passed as second parameter
  // third parameter is the callback.. btw now this route is protected,
  (req, res) => {
    // when auth is done
    return res.json(req.user); // now req.user has the object, sent back as res..
  }
);

module.exports = router;
//####****####****#### =
// now creating a route insteag of dooing app.get like in the server,  here roter.get() or .post or .whatis
// not needed to include /api/PROFILE.. because app uses already this file, is pointed here
// so, every route refers to /something starting from api/whatfileis/willBeSpecifiedInTheFile
// ex: router.get('/test') here is the actual route .get(/api/PROFILE/test)
