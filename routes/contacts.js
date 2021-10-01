const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const pool = require("../config/db");
const auth = require("../middleware/auth");

/*@route GET api/contacts
@desc get all contact by user
@access Private
*/
router.get("/", auth, async (req, res) => {
  try {
    let contacts = await pool.query(
      "SELECT * FROM contacts WHERE user_id=$1 ORDER BY created_at DESC",
      [req.user.id]
    );
    res.json(contacts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/*@route POST api/contacts
@desc add new contact
@access Private
*/
router.post(
  "/",
  [auth, check("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, contact_type } = req.body;
    const user_id = req.user.id;
    try {
      const newContact = await pool.query(
        "INSERT INTO contacts (user_id, name, email, phone, contact_type) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [user_id, name, email, phone, contact_type]
      );
      res.json(newContact.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

/*@route PUT api/contacts
@desc Edit a contact
@access Private
*/
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, contact_type } = req.body;
  try {
    let contact = await pool.query("SELECT * FROM contacts WHERE id=$1", [
      req.params.id,
    ]);

    if (contact.rows.length === 0) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.rows[0].user_id !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    let updatedContact = await pool.query(
      "UPDATE contacts SET name = $1, email = $2, phone = $3, contact_type = $4 WHERE id = $5 RETURNING *",
      [name, email, phone, contact_type, req.params.id]
    );
    res.json(updatedContact.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/*@route DELETE api/contacts
@desc delete a contact
@access Private
*/
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await pool.query("SELECT * FROM contacts WHERE id = $1", [
      req.params.id,
    ]);

    if (contact.rows.length === 0) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    if (contact.rows[0].user_id !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await pool.query("DELETE FROM contacts WHERE id = $1", [req.params.id]);
    res.json({ msg: `Conctact ${req.params.id} deleted` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
