const express = require("express");
const router = express.Router();
const mongoosre = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

//@route GET api/Items
//@description Get all
//@access Public.. for now .. should be private, now no autentication
router.get("/test", (req, res) => {
  res.json({ msg: "nice outtpostpostposthere adfxgain" });
});

//@route POST api/posts
//@description POST a Post
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //validation
    const isEmpty = require("../../validation/is-empty");
    // just see if the req.body itself is empty
    if (isEmpty(req.body)) {
      return res.status(400).json({ error: "no fields are filled in" });
    } else if (isEmpty(req.body.text)) {
      // if is not empty the body, but is empty the only required field
      return res.status(400).json({ error: "text field is required" });
    }
    // new post variable is mirrored in the post model
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    console.log(req);
    newPost.save().then(post => res.json(post));
  }
);

//@route DELETE api/post/
//@description D
//@access Public.. for now .. should be private, now no autentication

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profileFound => {
      // we needto chech that hiitng this route the user deleting is the user of the post
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              noautorization: "user is not autorized..   calling the cops..."
            });
          }
          post.remove().then(() => res.status(404).json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "POST NOT FOUND" }));
    });
  }
);
//@route DELETE api/post/
//@description DLETE
//@access Public.. for now .. should be private, now no autentication

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find the profile of this user who want to like
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //having a profile.. also searching the Post mathcing the PARAM OF THIS REQUEST
        Post.findById(req.params.id).then(post => {
          // check if the user has already liked, check if the id is already there
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            // post.likes array where the like.user is the same as the id of logged in user, if there is one the post is already liked from this user
            return res.status(400).json({ alreadyliked: "already liked" });
          }
          // if the filttered array in likes matching the user id is 0 we can add this user to the likes array
          post.likes.unshift({ user: req.user.id });
          // saving it .. this is only in the server, save to DB
          post.save().then(post => res.json(post));
        });
      })
      .catch(err => res.status(404).json({ postnotfound: "POST NOT FOUND" }));
  }
);

//@route POST api/post/
//@description UNLIKE
//@access PRIVATE

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //find the profile of this user who want to like
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //having a profile.. also searching the Post mathcing the PARAM OF THIS REQUEST
        Post.findById(req.params.id).then(post => {
          // check if the user has already liked, check if the id is already there
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length < 1
          ) {
            // if the user is not in the likes array
            return res.status(400).json({ notliked: "you have not liked yed" });
          }
          // if something get filtered out..
          // getting an array of the user id's
          const usersLikedIds = post.likes.map(like => like.user.toString());
          //see is which index is, the same value as the id of the user logged in
          const indexOfMatchedUserId = usersLikedIds.indexOf(req.user.id);
          // having the index directly take the record away from the array of likes
          post.likes.splice(indexOfMatchedUserId, 1);
          // saving it .. this is only in the server, save to DB
          post.save().then(post => res.json(post));
        });
      })
      .catch();
  }
);

module.exports = router;
