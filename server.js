const dotenv = require("dotenv").config();
const Namespace = require("./namespace");
const { namespace } = require("./namespace");
const express = require("express");
const connect = require("./databaseConnect");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

connect();

const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  namespace.log("GET /");
  return res.render("index.ejs", { name: "Perez" });
});

app.get("/login", (req, res) => {
  return res.render("login.ejs");
});

app.get("/register", (req, res) => {
  return res.render("register.ejs");
});

app.post("/register", (req, res) => {
  const log = namespace.space("POST /register");
  const { name, email, password } = req.body;

  log.log("register");
  log.log("username", name, "email", email, "password", password);
});

app.post("/login", (req, res) => {
  const log = namespace.space("POST /login");
  const { name, email, password } = req.body;

  log.log("login");
  log.log("username", name, "email", email, "password", password);
});

app.listen(process.env.PORT || 3000, () => {
  namespace.log("Listening on port ", process.env.PORT || 3000);
});
