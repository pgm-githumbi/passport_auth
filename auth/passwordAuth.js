//const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { namespace } = require("../namespace");
const { Strategy } = require("passport-local");

const auth = async (username, password, done) => {
  const log = namespace.space("authenticate");
  log.log("Authenticating", username, password, done);
  if (!username) {
    log.logErr("No username specified");
    return done(new Error("No username passed"), false);
  }

  const user = await User.findOne({ username });
  if (!user) {
    log.logErr("User not found");
    return done(null, false, { message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    log.logErr("Invalid password");
    return done(null, false, { message: "Invalid password" });
  }
  log.log("User authenticated").log(user.username).log(user.password);
  // Password is valid
  return done(null, user);
};

const strategize = (passport) => {
  const log = namespace.space("passport-init");
  log.log("Setting passport strategy");
  const strategy = new LocalStrategy({ usernameField: "name" }, auth);
  log.log(strategy);
  passport.use(strategy);

  passport.serializeUser((user, done) => {
    log.log("serializing user", user.username);
    done(null, user.uuid);
  });

  passport.deserializeUser((id, done) => {
    const user = User.findById(id);
    if (!user) {
      return done(new Error("User not found"), null);
    }
    return done(null, user);
  });
  return passport;
};

module.exports = { strategize };
