"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const _ = require("lodash/fp");
const index = require("./core-api/controller/index.js");
const index$1 = require("./core-api/service/index.js");
const index$2 = require("./core-api/routes/index.js");
const getContentTypeProxy = (strapi2, uid) => {
  return new Proxy(strapi2.contentType(uid), {
    get(target, prop) {
      const contentType = strapi2.contentType(uid);
      if (prop in contentType) {
        return contentType[prop];
      }
    }
  });
};
const createCoreController = (uid, cfg) => {
  return ({ strapi: strapi2 }) => {
    const baseController = index.createController({ contentType: getContentTypeProxy(strapi2, uid) });
    const userCtrl = typeof cfg === "function" ? cfg({ strapi: strapi2 }) : cfg ?? {};
    for (const methodName of Object.keys(baseController)) {
      if (userCtrl[methodName] === void 0) {
        userCtrl[methodName] = baseController[methodName];
      }
    }
    Object.setPrototypeOf(userCtrl, baseController);
    return userCtrl;
  };
};
function createCoreService(uid, cfg) {
  return ({ strapi: strapi2 }) => {
    const baseService = index$1.createService({ contentType: getContentTypeProxy(strapi2, uid) });
    const userService = typeof cfg === "function" ? cfg({ strapi: strapi2 }) : cfg ?? {};
    for (const methodName of Object.keys(baseService)) {
      if (userService[methodName] === void 0) {
        userService[methodName] = baseService[methodName];
      }
    }
    Object.setPrototypeOf(userService, baseService);
    return userService;
  };
}
function createCoreRouter(uid, cfg) {
  const { prefix, config = {}, only, except, type = "content-api" } = cfg ?? {};
  let routes;
  return {
    type,
    prefix,
    get routes() {
      if (!routes) {
        const contentType = strapi.contentType(uid);
        const defaultRoutes = index$2.createRoutes({ contentType });
        const keys = Object.keys(defaultRoutes);
        keys.forEach((routeName) => {
          const defaultRoute = defaultRoutes[routeName];
          Object.assign(defaultRoute.config, config[routeName] || {});
        });
        const selectedRoutes = _.pipe(
          (routes2) => except ? _.omit(except, routes2) : routes2,
          (routes2) => only ? _.pick(only, routes2) : routes2
        )(defaultRoutes);
        routes = Object.values(selectedRoutes);
      }
      return routes;
    }
  };
}
exports.createCoreController = createCoreController;
exports.createCoreRouter = createCoreRouter;
exports.createCoreService = createCoreService;
//# sourceMappingURL=factories.js.map
