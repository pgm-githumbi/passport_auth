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
    debug(this.getName())(args);
    return this;
  }
  logErr(...args) {
    debug(this.error().getName())(...args);
    return this.error();
  }
  logWarn(...args) {
    debug(this.warning().getName())(...args);
    return this.warning();
  }
}

module.exports = Namespace;

module.exports = { namespace: Namespace.default() };
