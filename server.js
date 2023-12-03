const dotenv = require("dotenv").config();
const Namespace = require("./namespace");
const { namespace } = require("./namespace");
const express = require("express");
const connect = require("./databaseConnect");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
const { strategize } = require("./auth/auth");
const passport = require("passport");
const session = require("express-session");

connect();

const app = express();

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
strategize(passport);

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/serverRoutes"));

app.listen(process.env.PORT || 3000, () => {
  namespace.log("Listening on port ", process.env.PORT || 3000);
});
