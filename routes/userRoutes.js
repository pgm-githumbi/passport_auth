const express = require("express");

const {
  getLogin,
  getRegister,
  login,
  register,
} = require("../controllers/usersController");
const router = express.Router();

router.get("/register", getRegister);
router.get("/login", getLogin);

router.post("/register", register);

module.exports = router;
