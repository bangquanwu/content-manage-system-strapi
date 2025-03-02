"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const _ = require("lodash/fp");
const helmet = require("koa-helmet");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const helmet__default = /* @__PURE__ */ _interopDefault(helmet);
const defaults = {
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: false,
  crossOriginResourcePolicy: false,
  originAgentCluster: false,
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "connect-src": ["'self'", "https:"],
      "img-src": ["'self'", "data:", "blob:", "https://market-assets.strapi.io"],
      "media-src": ["'self'", "data:", "blob:"],
      upgradeInsecureRequests: null
    }
  },
  xssFilter: false,
  hsts: {
    maxAge: 31536e3,
    includeSubDomains: true
  },
  frameguard: {
    action: "sameorigin"
  }
};
const security = (config, { strapi }) => (ctx, next) => {
  let helmetConfig = _.defaultsDeep(defaults, config);
  const specialPaths = ["/documentation"];
  if (strapi.plugin("graphql")) {
    const { config: gqlConfig } = strapi.plugin("graphql");
    specialPaths.push(gqlConfig("endpoint"));
  }
  if (ctx.method === "GET" && specialPaths.some((str) => ctx.path.startsWith(str))) {
    helmetConfig = _.merge(helmetConfig, {
      contentSecurityPolicy: {
        directives: {
          "script-src": ["'self'", "'unsafe-inline'", "cdn.jsdelivr.net"],
          "img-src": ["'self'", "data:", "cdn.jsdelivr.net", "strapi.io"]
        }
      }
    });
  }
  return helmet__default.default(helmetConfig)(ctx, next);
};
exports.security = security;
//# sourceMappingURL=security.js.map
