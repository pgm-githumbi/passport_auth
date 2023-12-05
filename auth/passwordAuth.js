//const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { namespace } = require("../namespace");

const auth = async (username, password, done) => {
  const log = namespace.space("authenticate").getLogger();
  const logErr = namespace.space("authenticate").getErrLogger();
  log("Authenticating", username, password);
  if (!username) {
    logErr("No username specified");
    return done(new Error("No username passed"), false);
  }

  const user = await User.findOne({ username });
  if (!user) {
    logErr("User not found");
    return done(null, false, { message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    logErr("Invalid password");
    return done(null, false, { message: "Invalid password" });
  }
  log("User authenticated: ", user);
  // Password is valid
  return done(null, user);
};

//@doc Set the authentication strategy to the passport
const strategize = (passport) => {
  const log = namespace.space("passport-init").getLogger();
  const logErr = namespace.space("passport-init").getErrLogger();

  log("Setting passport strategy");
  const strategy = new LocalStrategy({ usernameField: "name" }, auth);

  passport.use(strategy);

  passport.serializeUser((user, done) => {
    log("serializing user", user.email);
    done(null, user.uuid);
  });

  passport.deserializeUser((id, done) => {
    log("deserializing user: ", id);

    User.find({ uuid: id })
      .then((user) => {
        if (!user) {
          logErr("User not found", id);
          return done(new Error("User not found"), null);
        }
        log("Successfully deserialised user: ", user.email);

        return done(null, user);
      })
      .catch((err) => {
        return done(err);
      });
  });

  // strategize return
  return passport;
};

module.exports = { strategize };
