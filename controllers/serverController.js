const asyncHandler = require("express-async-handler");
const { namespace } = require("../namespace");

const root = asyncHandler(async (req, res) => {
  const log = namespace.space("root").getLogger();
  log("GET /");

  error_msg = req?.session?.args?.msg;
  if (error_msg) req.session.args.msg = undefined;
  if (error_msg) log("Showing error message: " + error_msg);
  return res.render("index.ejs", {
    name: `${req.user[0].username}`,
    email: req.user[0].email,
    message: error_msg || "",
  });
});

module.exports = { root };
