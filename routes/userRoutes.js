const express = require("express");
const logOutFirstMiddleware = require("../auth/logOutFirstMiddleware");
const {
  getLogin,
  getRegister,
  logOut,
  register,
} = require("../controllers/usersController");
const router = express.Router();

router.get("/register", logOutFirstMiddleware("back"), getRegister);
router.get("/login", logOutFirstMiddleware("back"), getLogin);

router.post("/register", register);
router.delete("/logout", logOut);

module.exports = router;
