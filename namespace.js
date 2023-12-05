const debug = require("debug");
class Namespace {
  constructor(namespace_name, parent_namespace = null) {
    this.namespace_name = namespace_name;
    this.parent_namespace = parent_namespace;
  }

  static default() {
    return new Namespace(process.env.DEBUG_DEFAULT_NAMESPACE || "app");
  }

  getName() {
    if (this.parent_namespace)
      return `${this.parent_namespace.getName()}:${this.namespace_name}`;
    return this.namespace_name;
  }

  space(space_name) {
    return new Namespace(space_name, this);
  }
  error() {
    return new Namespace("err", this);
  }
  warning() {
    return new Namespace("warn", this);
  }
  log(...args) {
    debug(this.getName())(...args);
    return this;
  }
  getLogger() {
    return this.log.bind(this);
  }
  logErr(...args) {
    debug(this.error().getName())(...args);
    return this.error();
  }
  getErrLogger() {
    return this.logErr.bind(this);
  }
  logWarn(...args) {
    debug(this.warning().getName())(...args);
    return this.warning();
  }

  middlewareLog = (args, options = {}) => {
    const {
      logReqBody,
      logReqUser,
      logReqSession,
      logReqHeaders,
      logReqMethod,
      logReqUrl,
      has,
    } = options;
    const { isAuthenticated, reqUser, reqSession, reqBody } = has || {};

    //----------------------------------------------------------------
    const middleware = (req, res, next) => {
      this.log(args);
      if (logReqBody) {
        this.log("req.body");
        this.log(req.body);
      }
      if (logReqUser) {
        this.log("req.user");
        this.log(req.user);
      }
      if (logReqSession) {
        this.log("req.session");
        this.log(req.session);
      }
      if (logReqHeaders) {
        this.log("req.headers");
        this.log(req.headers);
      }
      if (logReqMethod) {
        this.log("req.method");
        this.log(req.method);
      }
      if (logReqUrl) {
        this.log("req.url");
        this.log(req.url);
      }

      //--------------------------------------
      if (has) {
        if (has.isAuthenticated) {
          this.log("has.isAuthenticated");
          this.log(req.isAuthenticated && "yes");
        }
        if (has.reqSession) {
          this.log("has.Session");
          this.log(req.session && "yes");
        }
        if (has.reqUser) {
          this.log("has.User");
          this.log(req.user && "yes");
        }
        if (has.reqBody) {
          this.log("has.Body");
          this.log(req.body && "yes");
        }
      }
      next();
    };
    return middleware;
  };
}

module.exports = Namespace;

module.exports = { namespace: Namespace.default() };
