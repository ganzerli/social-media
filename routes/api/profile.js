const express = require("express");
const router = express.Router();
//####****####****#### ..read underneeth, messing up commetns here gives problems with authentication policyes from the browaser something..
//@route GET api/Items
//@description Get all
//@access Public.. for now .. should be private, now no autentication
router.get("/test", (req, res) => {
  res.json({ msg: "PROFILE" });
});
module.exports = router;

//####****####****#### =
// now creating a route insteag of dooing app.get like in the server,  here roter.get() or .post or .whatis
// not needed to include /api/PROFILE.. because app uses already this file, is pointed here
// so, every route refers to /something starting from api/whatfileis/willBeSpecifiedInTheFile
// ex: router.get('/test') here is the actual route .get(/api/PROFILE/test)
