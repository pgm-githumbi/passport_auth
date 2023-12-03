const express = require("express");
const { root } = require("../controllers/serverController");

const router = express.Router();

router.get("/", root);

module.exports = router;
