const asyncHandler = require("express-async-handler");
const { namespace } = require("../namespace");

const root = asyncHandler(async (req, res) => {
  const log = namespace.space("root");
  log.log("GET /");

  return res.render("index.ejs", { name: "Perez Githumbi" });
});

module.exports = { root };
