const { namespace } = require("../namespace");
const isAuthenticated = (req, res, next) => {
  const space = namespace.space("checkAuth");
  if (req.isAuthenticated()) {
    space.log("User is authenticated");
    space.log(req.user);
    return next();
  }
  space.log("User is not authenticated");
  return res.redirect("/login");
};

module.exports = isAuthenticated;
