const express = require("express");
const { root } = require("../controllers/serverController");
const isAuthenticated = require("../auth/isAuthenticatedMiddleware");
const { namespace } = require("../namespace");

const router = express.Router();

router.get(
  "/",
  namespace.space("GET /").middlewareLog("root page", {
    logReqBody: true,
    logReqHeaders: false,
    logReqSession: true,
  }),
  isAuthenticated,
  root
);

module.exports = router;
