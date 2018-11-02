const express = require("express");
const router = express.Router();

//@route GET api/users
//@description Get all
//@access Public

router.get("/test", (req, res) => {
  res.json({ msg: "nice outthere adfxgain" });
});

module.exports = router;
//####****####****#### =
// now creating a route insteag of dooing app.get like in the server,  here roter.get() or .post or .whatis
// not needed to include /api/PROFILE.. because app uses already this file, is pointed here
// so, every route refers to /something starting from api/whatfileis/willBeSpecifiedInTheFile
// ex: router.get('/test') here is the actual route .get(/api/PROFILE/test)
