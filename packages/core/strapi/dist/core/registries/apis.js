"use strict";
const _ = require("lodash/fp");
const apisRegistry = (strapi) => {
  const apis = {};
  return {
    get(name) {
      return apis[name];
    },
    getAll() {
      return apis;
    },
    add(apiName, apiConfig) {
      if (_.has(apiName, apis)) {
        throw new Error(`API ${apiName} has already been registered.`);
      }
      const api = strapi.container.get("modules").add(`api::${apiName}`, apiConfig);
      apis[apiName] = api;
      return apis[apiName];
    }
  };
};
module.exports = apisRegistry;
//# sourceMappingURL=apis.js.map
