const express = require("express");
const router = express.Router();

/*@route GET api/auth
@desc Get the logge in user
@access Private
*/
router.get("/", (req, res) => {
  res.send("Get logged in user");
});

/*@route POST api/auth
@desc Log a sur
@access Public
*/
router.post("/", (req, res) => {
  res.send("Log a user");
});

module.exports = router;
