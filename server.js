const dotenv = require("dotenv").config();
const Namespace = require("./namespace");
const { namespace } = require("./namespace");
const express = require("express");
const connect = require("./databaseConnect");
const asyncHandler = require("express-async-handler");
const methodOverride = require("method-override");
const flash = require("express-flash");
const { strategize } = require("./auth/passwordAuth");
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
    maxAge: 3600 * 24 * 60,
  })
);

app.use(
  namespace.space("BeforeMiddlewares").middlewareLog("", {
    //logReqMethod: true,
    //logReqUrl: true,
    //has: { isAuthenticated: true, reqUser: true, reqSession: true },
    //logReqSession: true,
  })
);

strategize(passport);
app.use(flash());
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", async (req, res, next) => {
  const logger = namespace.space("POST /login");
  logger.log("About to authenticate");
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
});
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/serverRoutes"));

app.listen(process.env.PORT || 3000, () => {
  namespace.log("Listening on port ", process.env.PORT || 3000);
});
