import { b as build$1, h as handleUnexpectedError } from "./index-94b44fa8.mjs";
import "@strapi/strapi/dist/utils/ee";
import "@strapi/typescript-utils";
import "node:os";
import "node:fs/promises";
import "node:path";
import "inquirer";
import "semver";
import "resolve-from";
import "execa";
import "read-pkg-up";
import "perf_hooks";
import "browserslist";
import "@strapi/strapi";
import "@strapi/utils";
import "dotenv";
import "esbuild-register/dist/node";
import "node:fs";
import "lodash/camelCase";
import "boxen";
import "chalk";
import "outdent";
import "prettier";
import "react";
import "react-dom/server";
import "react/jsx-runtime";
import "webpack";
import "browserslist-to-esbuild";
import "esbuild-loader";
import "html-webpack-plugin";
import "mini-css-extract-plugin";
import "fork-ts-checker-webpack-plugin";
import "webpack-bundle-analyzer";
import "node:crypto";
import "@pmmmwh/react-refresh-webpack-plugin";
import "path";
import "find-root";
import "chokidar";
import "node:cluster";
import "node:util";
import "webpack-dev-middleware";
import "webpack-hot-middleware";
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
    await build$1({
      ...options,
      minify: options.optimization ?? options.minify,
      sourcemaps: options.sourcemaps || envSourceMaps
    });
  } catch (err) {
    handleUnexpectedError(err);
  }
};
export {
  build
};
//# sourceMappingURL=build-6a823d3b.mjs.map
