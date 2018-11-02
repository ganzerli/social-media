const express = require("express");
const router = express.Router();

//@route GET api/Items
//@description Get all
//@access Public.. for now .. should be private, now no autentication

//istead app.get() we use the router on this file no serverjs
router.get("/test", (req, res) => {
  res.json({ msg: "nice outtpostpostposthere adfxgain" });
});
module.exports = router;
