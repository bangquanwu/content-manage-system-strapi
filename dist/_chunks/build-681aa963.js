"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const index = require("./index-44a5ff8c.js");
require("@strapi/strapi/dist/utils/ee");
require("@strapi/typescript-utils");
require("node:os");
require("node:fs/promises");
require("node:path");
require("inquirer");
require("semver");
require("resolve-from");
require("execa");
require("read-pkg-up");
require("perf_hooks");
require("browserslist");
require("@strapi/strapi");
require("@strapi/utils");
require("dotenv");
require("esbuild-register/dist/node");
require("node:fs");
require("lodash/camelCase");
require("boxen");
require("chalk");
require("outdent");
require("prettier");
require("react");
require("react-dom/server");
require("react/jsx-runtime");
require("webpack");
require("browserslist-to-esbuild");
require("esbuild-loader");
require("html-webpack-plugin");
require("mini-css-extract-plugin");
require("fork-ts-checker-webpack-plugin");
require("webpack-bundle-analyzer");
require("node:crypto");
require("@pmmmwh/react-refresh-webpack-plugin");
require("path");
require("find-root");
require("chokidar");
require("node:cluster");
require("node:util");
require("webpack-dev-middleware");
require("webpack-hot-middleware");
const build = async (options) => {
  try {
    if (typeof process.env.STRAPI_ENFORCE_SOURCEMAPS !== "undefined") {
      options.logger.warn(
        "[@strapi/strapi]: STRAPI_ENFORCE_SOURCEMAPS is now deprecated. You can enable sourcemaps by passing '--sourcemaps' to the build command."
      );
    }
    if (typeof options.optimization !== "undefined" && options.optimization !== true) {
      options.logger.warn(
        "[@strapi/strapi]: The optimization argument is now deprecated. Use '--minify' instead."
      );
    }
    const envSourceMaps = process.env.STRAPI_ENFORCE_SOURCEMAPS === "true";
    await index.build({
      ...options,
      minify: options.optimization ?? options.minify,
      sourcemaps: options.sourcemaps || envSourceMaps
    });
  } catch (err) {
    index.handleUnexpectedError(err);
  }
};
exports.build = build;
//# sourceMappingURL=build-681aa963.js.map
