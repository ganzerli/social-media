const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
// IMPORT PROFILE MODEL
const Profile = require("../../models/Profile");
// loading user model
const User = require("../../models/User");

const validateProfileInput = require("../../validation/profile");

//@route GET api/test
//@description Get all
//@access Public.. for now .. should be private, now no autentication
router.get("/test", (req, res) => {
  res.json({ msg: "PROFILE" });
});

//@route        GET api/profile
//@description  Get the current user profile
//@access       Private

router.get(
  "/", // api/profile ... router completes the route
  passport.authenticate("jwt", { session: false }),
  // the token puts the user in req.user, token fetches the id and returns the fetched done with the user  OBJ
  (req, res) => {
    const errors = {};
    //using profile model with mongoose method findOne searches the user from hs id
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"]) // in fild user: of ProfileSchema we are linked with the 'users' model, so we can get ["..",..] of it
      .then(profileObj => {
        if (!profileObj) {
          errors.noprofile = "no profile found for this user";
          return res.status(404).json(errors);
        }

        return res.json(profileObj); // if the profile is found we(server) send back the profile to the user
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route        POST api/Profile
//@description  CREATE OR UPDATE PROFILE
//@access       Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) res.status(400).json(errors);

    const profileFields = {};
    // PAYLOAD OF PASSPORT HAS ALL THE USERS DATA N THE REQ
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle; //if hadle is sent in, we set it in the profileFields object
    if (req.body.job) profileFields.job = req.body.job;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // SKILLS COMES in as a comma separated string " one,two,i like that,spaceshuttle"
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(","); //splitting skills into array.. now ["one", "two", ..]
    }
    // SOCIAL IS AN OBJECT OF FILDS so we need to init an object fotr the profilefilds, and THEN fill the subobject with objects
    //  now req.body.social.skills cannot be made nested once.
    profileFields.social = {};
    //probably if the obj social in the db is social:{{},{},{},{}} it does like req.body. makeAbunchSuperMethodWhatever( ...social )
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    // if user post to this route and the id got from req.user.id  (from jwt) is also in the table Profile, it has a profile, then just update
    Profile.findOne({ user: req.user.id })
      .then(profileObj => {
        if (profileObj) {
          //UPDATE
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          ).then(profileUpdated => res.json(profileUpdated));
        } else {
          //CREATE
          //check if the handle aready exists
          Profile.findOne({ handle: profileFields.handle })
            .then(profileObj => {
              if (profileObj) {
                // if there is a profile in the table-(collection), that has the same handle of the request..
                errors.handle = "handle already exists";
                return res.status(400).json(errors); // any validation errors 400
              } else {
                //if does not exist
                new Profile(profileFields)
                  .save()
                  .then(profileSaved => res.json(profileSaved));
              }
            })
            .catch();
        }
      })
      .catch();
  }
);

//@route GET api/profile/handle
//@description Get all
//@access Public..
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  console.log("hi");
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"]) // populate the field user in Profile model with the fields ["a","b"] of its linked object
    .then(profileFound => {
      console.log("hi2");
      if (!profileFound) {
        errors.noprofile = "no profile found for this user";
        console.log("hi3");
        return res.status(404).json(errors);
      }
      console.log("hi4");
      return res.json(profileFound); // if the profile is found we(server) send back the profile to the user
    })
    .catch(err => res.status(404).json(err));
});

//
//@route GET api/profile/:user_id
//@description Get profile with user id
//@access Public..
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"]) // populate the field user in Profile model with the fields ["a","b"] of its linked object
    .then(profileFoundWithIdParams => {
      if (!profileFoundWithIdParams) {
        errors.noprofile = "no profile found for this user";
        return res.status(404).json(errors);
      }
      return res.json(profileFoundWithIdParams); // if the profile is found we(server) send back the profile to the user
    })
    .catch(err =>
      res.status(404).json({ profile: "there is no profile with this id" })
    );
});

//@route GET api/profile/:user_id
//@description Get all
//@access Public..

router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["avatar", "name"])
    .then(profileBunch => {
      if (!profileBunch) {
        errors.profiles = "there isn't any profile created yet";
        return res.status(404).json(errors);
      } else {
        return res.json(profileBunch);
      }
    })
    .catch(err =>
      res
        .status(404)
        .json({ profiles: "something went wrong fetching all profiles" })
    );
});
module.exports = router;
