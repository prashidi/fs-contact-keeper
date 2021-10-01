const express = require("express");
const router = express.Router();

/*@route GET api/contacts
@desc get all contact by user
@access Private
*/
router.get("/", (req, res) => {
  res.send("Get user's contact");
});

/*@route POST api/contacts
@desc add new contact
@access Private
*/
router.post("/", (req, res) => {
  res.send("add new contact");
});

/*@route PUT api/contacts
@desc Edit a contact
@access Private
*/
router.put("/:id", (req, res) => {
  res.send("edit a contact");
});

/*@route DELETE api/contacts
@desc delete a contact
@access Private
*/
router.delete("/:id", (req, res) => {
  res.send("delete a contact");
});

module.exports = router;
