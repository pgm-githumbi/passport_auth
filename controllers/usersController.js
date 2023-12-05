const express = require("express");
const asyncHandler = require("express-async-handler");
const { namespace } = require("../namespace");
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// @route GET /login
// public
const getLogin = asyncHandler(async (req, res) => {
  const log = namespace.space("GET /login");
  log.log("getting login view");
  return res.render("../views/login.ejs");
});

// @route GET /register
// public
const getRegister = asyncHandler(async (req, res) => {
  const log = namespace.space("GET /register");
  log.log("Getting registration view");
  return res.render("../views/register.ejs");
});

//@route POST /login
// public
const login = asyncHandler(async (req, res) => {
  const log = namespace.space("GET /login");
  log.log("login user");
});

//@route POST /register
// public
const register = asyncHandler(async (req, res) => {
  const log = namespace.space("POST /register");
  log.log("register user");
  log.log(req.body);

  const { name, email, password } = req.body;
  const user = await User.create({
    username: name,
    email,
    password: await bcrypt.hash(password, 10),
    uuid: uuidv4(),
  });

  if (user) {
    log.log(user);
    return res.redirect("/login");
  }

  log.logErr("Failed to create user");
  return res.redirect("/register");
});

// @route DELETE /logout
// protected
const logOut = asyncHandler(async (req, res) => {
  const space = namespace.space("DELETE /logout");
  req.logOut((err, result) => {
    if (err) {
      space.logErr("Error occurred while loggging out");
      throw err;
    }
    space.log("logging out successful");
    return res.redirect("/login");
  });
});
module.exports = { getLogin, getRegister, register, logOut };
