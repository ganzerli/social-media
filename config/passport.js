const JwtStrategy = require("passport-jwt").Strategy; // to build the strategy to export
const ExtractJwt = require("passport-jwt").ExtractJwt; //gives the payload
const mongoose = require("mongoose"); //searching for the user that comes with the payload

const User = require("../models/User");
const keys = require("../config/keys"); // sending secret key with req ,then we need to validate it

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.aSuperSecretKey; // can be anything options.secretOrKey="hellostring";
// in server js is passed require(path)(passport).. here is the parameter
module.exports = passport => {
  //the payload should include the stuff signing jwt for /login
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      // will be used if specified in a specific route, protected route in users.js
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user); // fiirst is a error.. here not any
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
