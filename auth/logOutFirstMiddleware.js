const { namespace } = require("../namespace");

const logOutFirst = ({ url }) => {
  url = url || "back";
  const log = namespace.space("logOutFirst").getLogger();

  const middleware = (req, res, next) => {
    log("Attempting to access login routes");
    if (req.isAuthenticated()) {
      log("User is already authenticated");
      req.session.args = { msg: "Please Logout first" };
      return res.redirect(url);
    }
    log("Allowed since not yet authenticated");
    return next();
  };
  return middleware;
};

module.exports = logOutFirst;
