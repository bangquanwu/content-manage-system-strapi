import EE from "@strapi/strapi/dist/utils/ee";
import * as tsUtils from "@strapi/typescript-utils";
import os from "node:os";
import fs, { access } from "node:fs/promises";
import path from "node:path";
import inquirer from "inquirer";
import semver from "semver";
import resolveFrom from "resolve-from";
import execa from "execa";
import readPkgUp from "read-pkg-up";
import { performance } from "perf_hooks";
import browserslist from "browserslist";
import strapiFactory from "@strapi/strapi";
import { env, getConfigUrls, joinBy } from "@strapi/utils";
import dotenv from "dotenv";
import { register } from "esbuild-register/dist/node";
import fs$1 from "node:fs";
import camelCase from "lodash/camelCase";
import boxen from "boxen";
import chalk from "chalk";
import outdent from "outdent";
import { format } from "prettier";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { jsx, jsxs } from "react/jsx-runtime";
import webpack, { HotModuleReplacementPlugin, DefinePlugin, webpack as webpack$1 } from "webpack";
import browserslistToEsbuild from "browserslist-to-esbuild";
import { ESBuildMinifyPlugin } from "esbuild-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerPlugin from "fork-ts-checker-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import crypto from "node:crypto";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path$1 from "path";
import findRoot from "find-root";
import chokidar from "chokidar";
import cluster from "node:cluster";
import { promisify } from "node:util";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
const build$2 = ({ command, ctx }) => {
  command.command("build").option("-d, --debug", "Enable debugging mode with verbose logs", false).option("--ignore-prompts", "Ignore all prompts", false).option("--minify", "Minify the output", true).option("--no-optimization", "[deprecated]: use minify instead").option("--silent", "Don't log anything", false).option("--sourcemap", "Produce sourcemaps", false).option("--stats", "Print build statistics to the console", false).description("Build the strapi admin app").action(async (options) => {
    const { build: build2 } = await import("./build-6a823d3b.mjs");
    return build2({ ...options, ...ctx });
  });
};
const develop$1 = ({ command, ctx }) => {
  command.command("develop").alias("dev").option("-d, --debug", "Enable debugging mode with verbose logs", false).option("--silent", "Don't log anything", false).option("--ignore-prompts", "Ignore all prompts", false).option("--polling", "Watch for file changes in network directories", false).option("--watch-admin", "Watch the admin panel for hot changes", false).option(
    "--no-build",
    "[deprecated]: there is middleware for the server, it is no longer a separate process"
  ).option(
    "--watch-admin",
    "[deprecated]: there is now middleware for watching, it is no longer a separate process"
  ).option("--browser <name>", "[deprecated]: use open instead").option("--open", "Open the admin in your browser", true).description("Start your Strapi application in development mode").action(async (options) => {
    const { develop: develop2 } = await import("./develop-9830b6b9.mjs");
    return develop2({ ...options, ...ctx });
  });
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  build: build$2,
  develop: develop$1
}, Symbol.toStringTag, { value: "Module" }));
const getPackageManager = () => {
  const agent = process.env.npm_config_user_agent || "";
  if (agent.includes("yarn")) {
    return "yarn";
  }
  if (agent.includes("pnpm")) {
    return "pnpm";
  }
  if (/^npm\/\d/.test(agent)) {
    return "npm";
  }
  return void 0;
};
const PEER_DEPS = {
  react: "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^5.2.0",
  "styled-components": "^5.2.1"
};
const checkRequiredDependencies = async ({
  cwd,
  logger,
  ignorePrompts
}) => {
  const pkg = await readPkgUp({ cwd });
  if (!pkg) {
    throw new Error(`Could not find package.json at path: ${cwd}`);
  }
  logger.debug("Loaded package.json:", os.EOL, pkg.packageJson);
  const { install, review } = Object.entries(PEER_DEPS).reduce(
    (acc, [name, version]) => {
      if (!pkg.packageJson.dependencies) {
        throw new Error(`Could not find dependencies in package.json at path: ${cwd}`);
      }
      const declaredVersion = pkg.packageJson.dependencies[name];
      if (!declaredVersion) {
        acc.install.push({
          name,
          wantedVersion: version
        });
      } else {
        acc.review.push({
          name,
          wantedVersion: version,
          declaredVersion
        });
      }
      return acc;
    },
    {
      install: [],
      review: []
    }
  );
  if (install.length > 0) {
    logger.info(
      "The Strapi admin needs to install the following dependencies:",
      os.EOL,
      install.map(({ name, wantedVersion }) => `  - ${name}@${wantedVersion}`).join(os.EOL)
    );
    if (process.env.NODE_ENV !== "development" || ignorePrompts) {
      return { didInstall: false };
    }
    const { install: installAns } = await inquirer.prompt({
      type: "confirm",
      name: "install",
      default: true,
      message: "Would you like to install these dependencies now? These are not required but are recommended, from V5 these will be required."
    });
    if (installAns) {
      await installDependencies(install, {
        cwd,
        logger
      });
      const [file, ...args] = process.argv;
      await execa(file, args, { cwd, stdio: "inherit" });
      return { didInstall: true };
    } else {
      return { didInstall: false };
    }
  }
  if (review.length) {
    const errors = [];
    for (const dep of review) {
      let minDeclaredVersion = null;
      try {
        minDeclaredVersion = semver.minVersion(dep.declaredVersion);
      } catch (err) {
      }
      if (!minDeclaredVersion) {
        errors.push(
          `The declared dependency, ${dep.name} has an invalid version in package.json: ${dep.declaredVersion}`
        );
      } else if (!semver.satisfies(minDeclaredVersion, dep.wantedVersion)) {
        logger.warn(
          [
            `Declared version of ${dep.name} (${minDeclaredVersion}) is not compatible with the version required by Strapi (${dep.wantedVersion}).`,
            "You may experience issues, we recommend you change this."
          ].join(os.EOL)
        );
      }
      const installedVersion = await getModuleVersion(dep.name, cwd);
      if (!installedVersion) {
        errors.push(
          `The declared dependency, ${dep.name} is not installed. You should install before re-running this command`
        );
      } else if (!semver.satisfies(installedVersion, dep.wantedVersion)) {
        logger.warn(
          [
            `Declared version of ${dep.name} (${installedVersion}) is not compatible with the version required by Strapi (${dep.wantedVersion}).`,
            "You may experience issues, we recommend you change this."
          ].join(os.EOL)
        );
      }
    }
    if (errors.length > 0 && process.env.NODE_ENV === "development") {
      throw new Error(`${os.EOL}- ${errors.join(`${os.EOL}- `)}`);
    }
  }
  return { didInstall: false };
};
const getModule = async (name, cwd) => {
  const modulePackagePath = resolveFrom.silent(cwd, path.join(name, "package.json"));
  if (!modulePackagePath) {
    return null;
  }
  const file = await fs.readFile(modulePackagePath, "utf8").then((res) => JSON.parse(res));
  return file;
};
const getModuleVersion = async (name, cwd) => {
  const pkg = await getModule(name, cwd);
  return pkg?.version || null;
};
const installDependencies = async (install, { cwd, logger }) => {
  const packageManager = getPackageManager();
  if (!packageManager) {
    logger.error(
      "Could not find a supported package manager, please install the dependencies manually."
    );
    process.exit(1);
  }
  const execOptions = {
    encoding: "utf8",
    cwd,
    stdio: "inherit"
  };
  const packages = install.map(({ name, wantedVersion }) => `${name}@${wantedVersion}`);
  let result;
  if (packageManager === "npm") {
    const npmArgs = ["install", "--legacy-peer-deps", "--save", ...packages];
    logger.info(`Running 'npm ${npmArgs.join(" ")}'`);
    result = await execa("npm", npmArgs, execOptions);
  } else if (packageManager === "yarn") {
    const yarnArgs = ["add", ...packages];
    logger.info(`Running 'yarn ${yarnArgs.join(" ")}'`);
    result = await execa("yarn", yarnArgs, execOptions);
  } else if (packageManager === "pnpm") {
    const pnpmArgs = ["add", "--save-prod", ...packages];
    logger.info(`Running 'pnpm ${pnpmArgs.join(" ")}'`);
    result = await execa("pnpm", pnpmArgs, execOptions);
  }
  if (result?.exitCode || result?.failed) {
    throw new Error("Package installation failed");
  }
};
function getTimer() {
  const timings = {};
  const startTimes = {};
  function start(name) {
    if (typeof startTimes[name] !== "undefined") {
      throw new Error(`Timer "${name}" already started, cannot overwrite`);
    }
    startTimes[name] = performance.now();
  }
  function end(name) {
    if (typeof startTimes[name] === "undefined") {
      throw new Error(`Timer "${name}" never started, cannot end`);
    }
    timings[name] = performance.now() - startTimes[name];
    return timings[name];
  }
  return { start, end, getTimings: () => timings };
}
const prettyTime = (timeInMs) => {
  return Math.ceil(timeInMs) + "ms";
};
const pathExists = async (path2) => {
  try {
    await access(path2);
    return true;
  } catch (error) {
    return false;
  }
};
const loadFile = async (path2) => {
  if (await pathExists(path2)) {
    const esbuildOptions = {
      extensions: [".js", ".mjs", ".ts"]
    };
    const { unregister } = register(esbuildOptions);
    const mod = require(path2);
    unregister();
    const file = mod?.default || mod || void 0;
    return file;
  }
  return void 0;
};
const convertSystemPathToModulePath = (sysPath) => {
  if (process.platform === "win32") {
    return sysPath.split(path.sep).join(path.posix.sep);
  } else {
    return sysPath;
  }
};
const convertModulePathToSystemPath = (modulePath) => {
  if (process.platform === "win32") {
    return modulePath.split(path.posix.sep).join(path.sep);
  } else {
    return modulePath;
  }
};
const loadEnv = async (cwd) => {
  const pathToEnv = path.resolve(cwd, ".env");
  if (await pathExists(pathToEnv)) {
    dotenv.config({ path: pathToEnv });
  }
};
const getStrapiAdminEnvVars = (defaultEnv) => {
  return Object.keys(process.env).filter((key) => key.toUpperCase().startsWith("STRAPI_ADMIN_")).reduce((acc, key) => {
    acc[key] = process.env[key];
    return acc;
  }, defaultEnv);
};
const isError = (err) => err instanceof Error;
const handleUnexpectedError = (err) => {
  console.error(
    chalk.red(
      `[ERROR] `,
      "There seems to be an unexpected error, try again with --debug for more information",
      os.EOL
    )
  );
  if (isError(err) && err.stack) {
    console.log(
      chalk.red(
        boxen(err.stack, {
          padding: 1,
          align: "left"
        })
      )
    );
  }
  process.exit(1);
};
const validatePackageHasStrapi = (pkg) => "strapi" in pkg && typeof pkg.strapi === "object" && !Array.isArray(pkg.strapi) && pkg.strapi !== null;
const validatePackageIsPlugin = (pkg) => validatePackageHasStrapi(pkg) && pkg.strapi.kind === "plugin";
const getEnabledPlugins = async ({
  cwd,
  logger,
  runtimeDir,
  strapi
}) => {
  const plugins = {};
  const deps = strapi.config.get("info.dependencies", {});
  logger.debug("Dependencies from user's project", os.EOL, deps);
  for (const dep of Object.keys(deps)) {
    const pkg = await getModule(dep, cwd);
    if (pkg && validatePackageIsPlugin(pkg)) {
      const name = pkg.strapi.name || pkg.name;
      if (!name) {
        throw Error(
          "You're trying to import a plugin that doesn't have a name – check the package.json of that plugin!"
        );
      }
      plugins[name] = {
        name,
        importName: camelCase(name),
        type: "module",
        modulePath: dep
      };
    }
  }
  const userPluginsFile = await loadUserPluginsFile(strapi.dirs.app.config);
  logger.debug("User's plugins file", os.EOL, userPluginsFile);
  for (const [userPluginName, userPluginConfig] of Object.entries(userPluginsFile)) {
    if (userPluginConfig.enabled && userPluginConfig.resolve) {
      const sysPath = convertModulePathToSystemPath(userPluginConfig.resolve);
      plugins[userPluginName] = {
        name: userPluginName,
        importName: camelCase(userPluginName),
        type: "local",
        /**
         * User plugin paths are resolved from the entry point
         * of the app, because that's how you import them.
         */
        modulePath: convertSystemPathToModulePath(path.relative(runtimeDir, sysPath)),
        path: sysPath
      };
    }
  }
  return plugins;
};
const PLUGIN_CONFIGS = ["plugins.js", "plugins.mjs", "plugins.ts"];
const loadUserPluginsFile = async (root) => {
  for (const file of PLUGIN_CONFIGS) {
    const filePath = path.join(root, file);
    const configFile = await loadFile(filePath);
    if (configFile) {
      return typeof configFile === "function" ? configFile({ env }) : configFile;
    }
  }
  return {};
};
const getMapOfPluginsWithAdmin = (plugins) => Object.values(plugins).filter((plugin) => {
  if (!plugin) {
    return false;
  }
  try {
    const isLocalPluginWithLegacyAdminFile = plugin.path && fs$1.existsSync(path.join(plugin.path, "strapi-admin.js"));
    if (!isLocalPluginWithLegacyAdminFile) {
      const isModuleWithFE = require.resolve(`${plugin.modulePath}/strapi-admin`);
      return isModuleWithFE;
    }
    return isLocalPluginWithLegacyAdminFile;
  } catch (err) {
    if (isError(err) && "code" in err && (err.code === "MODULE_NOT_FOUND" || err.code === "ERR_PACKAGE_PATH_NOT_EXPORTED")) {
      return false;
    }
    throw err;
  }
}).map((plugin) => ({
  ...plugin,
  modulePath: `${plugin.modulePath}/strapi-admin`
}));
const ADMIN_APP_FILES = ["app.js", "app.mjs", "app.ts", "app.jsx", "app.tsx"];
const loadUserAppFile = async ({
  runtimeDir,
  appDir
}) => {
  for (const file of ADMIN_APP_FILES) {
    const filePath = path.join(appDir, "src", "admin", file);
    if (await pathExists(filePath)) {
      return {
        path: filePath,
        modulePath: convertSystemPathToModulePath(path.relative(runtimeDir, filePath))
      };
    }
  }
  return void 0;
};
const DEFAULT_BROWSERSLIST = [
  "last 3 major versions",
  "Firefox ESR",
  "last 2 Opera versions",
  "not dead"
];
const createBuildContext = async ({
  cwd,
  logger,
  tsconfig,
  strapi,
  options = {}
}) => {
  const strapiInstance = strapi ?? strapiFactory({
    // Directories
    appDir: cwd,
    distDir: tsconfig?.config.options.outDir ?? "",
    // Options
    autoReload: true,
    serveAdminPanel: false
  });
  const { serverUrl, adminPath } = getConfigUrls(strapiInstance.config, true);
  const appDir = strapiInstance.dirs.app.root;
  await loadEnv(cwd);
  const env2 = getStrapiAdminEnvVars({
    ADMIN_PATH: adminPath,
    STRAPI_ADMIN_BACKEND_URL: serverUrl,
    STRAPI_TELEMETRY_DISABLED: String(strapiInstance.telemetry.isDisabled)
  });
  const envKeys = Object.keys(env2);
  if (envKeys.length > 0) {
    logger.info(
      [
        "Including the following ENV variables as part of the JS bundle:",
        ...envKeys.map((key) => `    - ${key}`)
      ].join(os.EOL)
    );
  }
  const distPath = path.join(strapiInstance.dirs.dist.root, "build");
  const distDir = path.relative(cwd, distPath);
  try {
    logger.debug(`Cleaning dist folder: ${distPath}`);
    await fs.rm(distPath, { recursive: true, force: true });
    logger.debug("Cleaned dist folder");
  } catch {
    logger.debug("There was no dist folder to clean");
  }
  const runtimeDir = path.join(cwd, ".strapi", "client");
  const entry = path.relative(cwd, path.join(runtimeDir, "app.js"));
  const plugins = await getEnabledPlugins({ cwd, logger, runtimeDir, strapi: strapiInstance });
  logger.debug("Enabled plugins", os.EOL, plugins);
  const pluginsWithFront = getMapOfPluginsWithAdmin(plugins);
  logger.debug("Enabled plugins with FE", os.EOL, plugins);
  const target = browserslist.loadConfig({ path: cwd }) ?? DEFAULT_BROWSERSLIST;
  const customisations = await loadUserAppFile({ appDir, runtimeDir });
  const buildContext = {
    appDir,
    basePath: `${adminPath}/`,
    customisations,
    cwd,
    distDir,
    distPath,
    entry,
    env: env2,
    logger,
    options,
    plugins: pluginsWithFront,
    runtimeDir,
    strapi: strapiInstance,
    target,
    tsconfig
  };
  return buildContext;
};
const styles = `
.strapi--root {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #fff;
}

.strapi--no-js {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: helvetica, arial, sans-serif;
}
`;
const NoJavascript = () => {
  return /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx("div", { className: "strapi--root", children: /* @__PURE__ */ jsxs("div", { className: "strapi--no-js", children: [
    /* @__PURE__ */ jsx("style", { type: "text/css", children: styles }),
    /* @__PURE__ */ jsx("h1", { children: "JavaScript disabled" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Please ",
      /* @__PURE__ */ jsx("a", { href: "https://www.enable-javascript.com/", children: "enable JavaScript" }),
      " in your browser and reload the page to proceed."
    ] })
  ] }) }) });
};
const globalStyles = `
  html,
  body,
  #strapi {
    height: 100%;
  }
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }
`;
const DefaultDocument = () => {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex" }),
      /* @__PURE__ */ jsx("meta", { name: "referrer", content: "same-origin" }),
      /* @__PURE__ */ jsx("title", { children: "Content Manage Admin" }),
      /* @__PURE__ */ jsx("style", { children: globalStyles })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("div", { id: "strapi" }),
      /* @__PURE__ */ jsx(NoJavascript, {})
    ] })
  ] });
};
const getEntryModule = (ctx) => {
  const pluginsObject = ctx.plugins.map(({ name, importName }) => `'${name}': ${importName}`).join(",\n");
  const pluginsImport = ctx.plugins.map(({ importName, modulePath }) => `import ${importName} from '${modulePath}';`).join("\n");
  return outdent`
        /**
         * This file was automatically generated by Strapi.
         * Any modifications made will be discarded.
         */
        ${pluginsImport}
        import { renderAdmin } from "@strapi/strapi/admin"

        ${ctx.customisations?.modulePath ? `import customisations from '${ctx.customisations.modulePath}'` : ""}

        renderAdmin(
          document.getElementById("strapi"),
          {
            ${ctx.customisations?.modulePath ? "customisations," : ""}
            plugins: {
        ${pluginsObject}
            }
        })
      `;
};
const getDocumentHTML = async ({ logger }) => {
  const result = renderToStaticMarkup(createElement(DefaultDocument));
  logger.debug("Rendered the HTML");
  return outdent`<!DOCTYPE html>${result}`;
};
const AUTO_GENERATED_WARNING = `
This file was automatically generated by Strapi.
Any modifications made will be discarded.
`.trim();
const decorateHTMLWithAutoGeneratedWarning = (htmlTemplate) => htmlTemplate.replace(/<head/, `
<!--
${AUTO_GENERATED_WARNING}
-->
<head`);
const writeStaticClientFiles = async (ctx) => {
  await fs.mkdir(ctx.runtimeDir, { recursive: true });
  ctx.logger.debug("Created the runtime directory");
  const indexHtml = decorateHTMLWithAutoGeneratedWarning(
    await getDocumentHTML({ logger: ctx.logger })
  );
  await fs.writeFile(
    path.join(ctx.runtimeDir, "index.html"),
    format(indexHtml, {
      parser: "html"
    })
  );
  ctx.logger.debug("Wrote the index.html file");
  await fs.writeFile(
    path.join(ctx.runtimeDir, "app.js"),
    format(getEntryModule(ctx), {
      parser: "babel"
    })
  );
  ctx.logger.debug("Wrote the app.js file");
};
const adminPackageAliases = [
  "@strapi/design-system",
  "@strapi/helper-plugin",
  "@strapi/icons",
  "date-fns",
  "formik",
  "history",
  "immer",
  "qs",
  "lodash",
  "react",
  "react-dnd",
  "react-dnd-html5-backend",
  "react-dom",
  "react-error-boundary",
  "react-helmet",
  "react-is",
  "react-intl",
  "react-query",
  "react-redux",
  "react-router-dom",
  "react-window",
  "react-select",
  "redux",
  "reselect",
  "styled-components",
  "yup"
];
const getAdminDependencyAliases = (monorepo) => adminPackageAliases.filter(
  (moduleName) => !monorepo?.path || monorepo.path && moduleName !== "@strapi/helper-plugin"
).reduce((acc, moduleName) => {
  acc[`${moduleName}$`] = findRoot(require.resolve(moduleName));
  return acc;
}, {});
const devAliases = {
  "@strapi/admin/strapi-admin": "./packages/core/admin/admin/src",
  "@strapi/content-type-builder/strapi-admin": "./packages/core/content-type-builder/admin/src",
  "@strapi/email/strapi-admin": "./packages/core/email/admin/src",
  "@strapi/upload/strapi-admin": "./packages/core/upload/admin/src",
  "@strapi/plugin-color-picker/strapi-admin": "./packages/plugins/color-picker/admin/src",
  "@strapi/plugin-documentation/strapi-admin": "./packages/plugins/documentation/admin/src",
  "@strapi/plugin-graphql/strapi-admin": "./packages/plugins/graphql/admin/src",
  "@strapi/plugin-i18n/strapi-admin": "./packages/plugins/i18n/admin/src",
  "@strapi/plugin-sentry/strapi-admin": "./packages/plugins/sentry/admin/src",
  "@strapi/plugin-users-permissions/strapi-admin": "./packages/plugins/users-permissions/admin/src",
  "@strapi/helper-plugin": "./packages/core/helper-plugin/src"
};
const getAliases = (cwd, monorepo) => {
  const adminAliases = getAdminDependencyAliases(monorepo);
  const monorepoAliases = monorepo ? Object.fromEntries(
    Object.entries(devAliases).map(([key, modulePath]) => {
      return [key, path$1.join(monorepo.path, modulePath)];
    })
  ) : {};
  return {
    ...adminAliases,
    ...monorepoAliases
  };
};
async function loadStrapiMonorepo(cwd) {
  let p = cwd;
  while (p !== "/") {
    const readResult = await readPkgUp({ cwd: p });
    if (!readResult) {
      return void 0;
    }
    if (readResult.packageJson.isStrapiMonorepo) {
      return { path: path$1.dirname(readResult.path) };
    }
    p = path$1.dirname(path$1.dirname(readResult.path));
  }
  return void 0;
}
const resolveBaseConfig = async (ctx) => {
  const monorepo = await loadStrapiMonorepo(ctx.cwd);
  const target = browserslistToEsbuild(ctx.target);
  return {
    experiments: {
      topLevelAwait: true
    },
    entry: {
      main: [`./${ctx.entry}`]
    },
    resolve: {
      alias: getAliases(ctx.cwd, monorepo),
      extensions: [".js", ".jsx", ".react.js", ".ts", ".tsx"]
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: require.resolve("esbuild-loader"),
          options: {
            loader: "tsx",
            target,
            jsx: "automatic"
          }
        },
        {
          test: /\.(js|jsx|mjs)$/,
          use: {
            loader: require.resolve("esbuild-loader"),
            options: {
              loader: "jsx",
              target,
              jsx: "automatic"
            }
          }
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false
          }
        },
        {
          test: /\.css$/i,
          use: [require.resolve("style-loader"), require.resolve("css-loader")]
        },
        {
          test: /\.(svg|eot|otf|ttf|woff|woff2)$/,
          type: "asset/resource"
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 1e3
            }
          }
        },
        {
          test: /\.(mp4|webm)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 1e4
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(ctx.runtimeDir, "index.html")
      }),
      new DefinePlugin(
        Object.entries(ctx.env).reduce((acc, [key, value]) => {
          acc[`process.env.${key}`] = JSON.stringify(value);
          return acc;
        }, {})
      ),
      ctx.tsconfig && new ForkTsCheckerPlugin({
        typescript: {
          configFile: ctx.tsconfig.path,
          configOverwrite: {
            compilerOptions: {
              sourceMap: ctx.options.sourcemaps
            }
          }
        }
      })
    ].filter(Boolean)
  };
};
const resolveDevelopmentConfig = async (ctx) => {
  const baseConfig = await resolveBaseConfig(ctx);
  return {
    ...baseConfig,
    cache: {
      type: "filesystem",
      // version cache when there are changes to aliases
      buildDependencies: {
        config: [__filename]
      },
      version: crypto.createHash("md5").update(Object.entries(baseConfig.resolve.alias).join()).digest("hex")
    },
    entry: {
      ...baseConfig.entry,
      main: [
        `${require.resolve("webpack-hot-middleware/client")}?path=/__webpack_hmr`,
        ...baseConfig.entry.main
      ]
    },
    stats: "errors-warnings",
    mode: "development",
    devtool: "inline-source-map",
    output: {
      filename: "[name].js",
      path: ctx.distPath,
      publicPath: ctx.basePath
    },
    infrastructureLogging: {
      level: "error"
    },
    plugins: [
      ...baseConfig.plugins,
      new HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin()
    ]
  };
};
const resolveProductionConfig = async (ctx) => {
  const target = browserslistToEsbuild(ctx.target);
  const baseConfig = await resolveBaseConfig(ctx);
  return {
    ...baseConfig,
    stats: "errors-only",
    mode: "production",
    bail: true,
    devtool: ctx.options.sourcemaps ? "source-map" : false,
    output: {
      path: ctx.distPath,
      publicPath: ctx.basePath,
      // Utilize long-term caching by adding content hashes (not compilation hashes)
      // to compiled assets for production
      filename: "[name].[contenthash:8].js",
      chunkFilename: "[name].[contenthash:8].chunk.js"
    },
    optimization: {
      minimize: ctx.options.minify,
      minimizer: [
        new ESBuildMinifyPlugin({
          target,
          css: true
          // Apply minification to CSS assets
        })
      ],
      moduleIds: "deterministic",
      runtimeChunk: true
    },
    plugins: [
      ...baseConfig.plugins,
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css",
        chunkFilename: "[name].[chunkhash].chunkhash.css",
        ignoreOrder: true
      }),
      ctx.options.stats && new BundleAnalyzerPlugin()
    ].filter(Boolean)
  };
};
const USER_CONFIGS = ["webpack.config.js", "webpack.config.mjs", "webpack.config.ts"];
const getUserConfig = async (ctx) => {
  for (const file of USER_CONFIGS) {
    const filePath = path.join(ctx.appDir, "src", "admin", file);
    const configFile = await loadFile(filePath);
    if (configFile) {
      return configFile;
    }
  }
  return void 0;
};
const mergeConfigWithUserConfig = async (config, ctx) => {
  const userConfig = await getUserConfig(ctx);
  if (userConfig) {
    if (typeof userConfig === "function") {
      const webpack2 = await import("webpack");
      return userConfig(config, webpack2);
    } else {
      ctx.logger.warn(
        `You've exported something other than a function from ${path.join(
          ctx.appDir,
          "src",
          "admin",
          "webpack.config"
        )}, this will ignored.`
      );
    }
  }
  return config;
};
const build$1 = async (ctx) => new Promise(async (resolve, reject) => {
  const config = await resolveProductionConfig(ctx);
  const finalConfig = await mergeConfigWithUserConfig(config, ctx);
  ctx.logger.debug("Webpack config", finalConfig);
  webpack(finalConfig, (err, stats) => {
    if (stats) {
      if (stats.hasErrors()) {
        ctx.logger.error(
          stats.toString({
            chunks: false,
            colors: true
          })
        );
        reject(false);
      } else if (ctx.options.stats) {
        ctx.logger.info(
          stats.toString({
            chunks: false,
            colors: true
          })
        );
      }
      resolve(true);
    }
    if (err && isError(err)) {
      ctx.logger.error(err.message);
      reject(false);
    }
  });
});
const build = async ({ logger, cwd, tsconfig, ignorePrompts, ...options }) => {
  const timer = getTimer();
  const { didInstall } = await checkRequiredDependencies({ cwd, logger, ignorePrompts }).catch(
    (err) => {
      logger.error(err.message);
      process.exit(1);
    }
  );
  if (didInstall) {
    return;
  }
  if (tsconfig?.config) {
    timer.start("compilingTS");
    const compilingTsSpinner = logger.spinner(`Compiling TS`).start();
    tsUtils.compile(cwd, { configOptions: { ignoreDiagnostics: false } });
    const compilingDuration = timer.end("compilingTS");
    compilingTsSpinner.text = `Compiling TS (${prettyTime(compilingDuration)})`;
    compilingTsSpinner.succeed();
  }
  timer.start("createBuildContext");
  const contextSpinner = logger.spinner(`Building build context`).start();
  console.log("");
  const ctx = await createBuildContext({
    cwd,
    logger,
    tsconfig,
    options
  });
  const contextDuration = timer.end("createBuildContext");
  contextSpinner.text = `Building build context (${prettyTime(contextDuration)})`;
  contextSpinner.succeed();
  timer.start("buildAdmin");
  const buildingSpinner = logger.spinner(`Building admin panel`).start();
  console.log("");
  try {
    EE.init(cwd);
    await writeStaticClientFiles(ctx);
    await build$1(ctx);
    const buildDuration = timer.end("buildAdmin");
    buildingSpinner.text = `Building admin panel (${prettyTime(buildDuration)})`;
    buildingSpinner.succeed();
  } catch (err) {
    buildingSpinner.fail();
    throw err;
  }
};
const watch = async (ctx) => {
  const config = await resolveDevelopmentConfig(ctx);
  const finalConfig = await mergeConfigWithUserConfig(config, ctx);
  ctx.logger.debug("Final webpack config:", os.EOL, finalConfig);
  return new Promise((res) => {
    const compiler = webpack$1(finalConfig);
    const devMiddleware = webpackDevMiddleware(compiler);
    const hotMiddleware = webpackHotMiddleware(compiler, {
      log: false,
      path: "/__webpack_hmr"
    });
    ctx.strapi.server.app.use((ctx2, next) => {
      return new Promise((resolve, reject) => {
        hotMiddleware(ctx2.req, ctx2.res, (err) => {
          if (err)
            reject(err);
          else
            resolve(next());
        });
      });
    });
    ctx.strapi.server.app.use((context, next) => {
      const ready = new Promise((resolve, reject) => {
        devMiddleware.waitUntilValid(() => {
          resolve(true);
        });
      });
      const init = new Promise((resolve) => {
        devMiddleware(
          context.req,
          {
            // @ts-expect-error
            end: (content) => {
              context.body = content;
              resolve(true);
            },
            getHeader: context.get.bind(context),
            // @ts-expect-error
            setHeader: context.set.bind(context),
            locals: context.state
          },
          () => resolve(next())
        );
      });
      return Promise.all([ready, init]);
    });
    const serveAdmin = async (ctx2, next) => {
      await next();
      if (devMiddleware.context.outputFileSystem.createReadStream) {
        if (ctx2.method !== "HEAD" && ctx2.method !== "GET") {
          return;
        }
        if (ctx2.body != null || ctx2.status !== 404) {
          return;
        }
        const filename = path.resolve(finalConfig.output?.path, "index.html");
        ctx2.type = "html";
        ctx2.body = devMiddleware.context.outputFileSystem.createReadStream(filename);
      }
    };
    ctx.strapi.server.routes([
      {
        method: "GET",
        path: `${ctx.basePath}:path*`,
        handler: serveAdmin,
        config: { auth: false }
      }
    ]);
    devMiddleware.waitUntilValid(() => {
      res({
        async close() {
          await Promise.all([
            promisify(devMiddleware.close.bind(devMiddleware))(),
            hotMiddleware.close(),
            promisify(compiler.close.bind(compiler))()
          ]);
        }
      });
    });
  });
};
const cleanupDistDirectory = async ({
  tsconfig,
  logger,
  timer
}) => {
  const distDir = tsconfig?.config?.options?.outDir;
  if (!distDir || // we don't have a dist dir
  await fs.access(distDir).then(() => false).catch(() => true)) {
    return;
  }
  const timerName = "cleaningDist" + Date.now();
  timer.start(timerName);
  const cleaningSpinner = logger.spinner(`Cleaning dist dir ${distDir}`).start();
  try {
    const dirContent = await fs.readdir(distDir);
    const validFilenames = dirContent.filter((filename) => filename !== "build");
    for (const filename of validFilenames) {
      await fs.rm(path.resolve(distDir, filename), { recursive: true });
    }
  } catch (err) {
    const generatingDuration2 = timer.end(timerName);
    cleaningSpinner.text = `Error cleaning dist dir: ${err} (${prettyTime(generatingDuration2)})`;
    cleaningSpinner?.fail();
    return;
  }
  const generatingDuration = timer.end(timerName);
  cleaningSpinner.text = `Cleaning dist dir (${prettyTime(generatingDuration)})`;
  cleaningSpinner?.succeed();
};
const develop = async ({
  cwd,
  polling,
  logger,
  tsconfig,
  ignorePrompts,
  watchAdmin,
  ...options
}) => {
  const timer = getTimer();
  if (cluster.isPrimary) {
    const { didInstall } = await checkRequiredDependencies({ cwd, logger, ignorePrompts }).catch(
      (err) => {
        logger.error(err.message);
        process.exit(1);
      }
    );
    if (didInstall) {
      return;
    }
    if (tsconfig?.config) {
      await cleanupDistDirectory({ tsconfig, logger, timer });
      await tsUtils.compile(cwd, { configOptions: { ignoreDiagnostics: true } });
    }
    if (!watchAdmin) {
      timer.start("createBuildContext");
      const contextSpinner = logger.spinner(`Building build context`).start();
      console.log("");
      const ctx = await createBuildContext({
        cwd,
        logger,
        tsconfig,
        options
      });
      const contextDuration = timer.end("createBuildContext");
      contextSpinner.text = `Building build context (${prettyTime(contextDuration)})`;
      contextSpinner.succeed();
      timer.start("creatingAdmin");
      const adminSpinner = logger.spinner(`Creating admin`).start();
      EE.init(cwd);
      await writeStaticClientFiles(ctx);
      await build$1(ctx);
      const adminDuration = timer.end("creatingAdmin");
      adminSpinner.text = `Creating admin (${prettyTime(adminDuration)})`;
      adminSpinner.succeed();
    }
    cluster.on("message", async (worker, message) => {
      switch (message) {
        case "reload": {
          if (tsconfig?.config) {
            await cleanupDistDirectory({ tsconfig, logger, timer });
            await tsUtils.compile(cwd, { configOptions: { ignoreDiagnostics: true } });
          }
          logger.debug("cluster has the reload message, sending the worker kill message");
          worker.send("kill");
          break;
        }
        case "killed": {
          logger.debug("cluster has the killed message, forking the cluster");
          cluster.fork();
          break;
        }
        case "stop": {
          process.exit(1);
          break;
        }
      }
    });
    cluster.fork();
  }
  if (cluster.isWorker) {
    timer.start("loadStrapi");
    const loadStrapiSpinner = logger.spinner(`Loading Strapi`).start();
    const strapi = strapiFactory({
      appDir: cwd,
      distDir: tsconfig?.config.options.outDir ?? "",
      autoReload: true,
      serveAdminPanel: !watchAdmin
    });
    let webpackWatcher;
    if (watchAdmin) {
      timer.start("createBuildContext");
      const contextSpinner = logger.spinner(`Building build context`).start();
      console.log("");
      const ctx = await createBuildContext({
        cwd,
        logger,
        strapi,
        tsconfig,
        options
      });
      const contextDuration = timer.end("createBuildContext");
      contextSpinner.text = `Building build context (${prettyTime(contextDuration)})`;
      contextSpinner.succeed();
      timer.start("creatingAdmin");
      const adminSpinner = logger.spinner(`Creating admin`).start();
      EE.init(cwd);
      await writeStaticClientFiles(ctx);
      webpackWatcher = await watch(ctx);
      const adminDuration = timer.end("creatingAdmin");
      adminSpinner.text = `Creating admin (${prettyTime(adminDuration)})`;
      adminSpinner.succeed();
    }
    const strapiInstance = await strapi.load();
    const loadStrapiDuration = timer.end("loadStrapi");
    loadStrapiSpinner.text = `Loading Strapi (${prettyTime(loadStrapiDuration)})`;
    loadStrapiSpinner.succeed();
    timer.start("generatingTS");
    const generatingTsSpinner = logger.spinner(`Generating types`).start();
    await tsUtils.generators.generate({
      strapi: strapiInstance,
      pwd: cwd,
      rootDir: void 0,
      logger: { silent: true, debug: false },
      artifacts: { contentTypes: true, components: true }
    });
    const generatingDuration = timer.end("generatingTS");
    generatingTsSpinner.text = `Generating types (${prettyTime(generatingDuration)})`;
    generatingTsSpinner.succeed();
    if (tsconfig?.config) {
      timer.start("compilingTS");
      const compilingTsSpinner = logger.spinner(`Compiling TS`).start();
      await cleanupDistDirectory({ tsconfig, logger, timer });
      await tsUtils.compile(cwd, { configOptions: { ignoreDiagnostics: false } });
      const compilingDuration = timer.end("compilingTS");
      compilingTsSpinner.text = `Compiling TS (${prettyTime(compilingDuration)})`;
      compilingTsSpinner.succeed();
    }
    const restart = async () => {
      if (strapiInstance.reload.isWatching && !strapiInstance.reload.isReloading) {
        strapiInstance.reload.isReloading = true;
        strapiInstance.reload();
      }
    };
    const watcher = chokidar.watch(cwd, {
      ignoreInitial: true,
      usePolling: polling,
      ignored: [
        /(^|[/\\])\../,
        // dot files
        /tmp/,
        "**/src/admin/**",
        "**/src/plugins/**/admin/**",
        "**/dist/src/plugins/test/admin/**",
        "**/documentation",
        "**/documentation/**",
        "**/node_modules",
        "**/node_modules/**",
        "**/plugins.json",
        "**/build",
        "**/build/**",
        "**/index.html",
        "**/public",
        "**/public/**",
        strapiInstance.dirs.static.public,
        joinBy("/", strapiInstance.dirs.static.public, "**"),
        "**/*.db*",
        "**/exports/**",
        "**/dist/**",
        "**/*.d.ts",
        ...strapiInstance.config.get("admin.watchIgnoreFiles", [])
      ]
    }).on("add", (path2) => {
      strapiInstance.log.info(`File created: ${path2}`);
      restart();
    }).on("change", (path2) => {
      strapiInstance.log.info(`File changed: ${path2}`);
      restart();
    }).on("unlink", (path2) => {
      strapiInstance.log.info(`File deleted: ${path2}`);
      restart();
    });
    process.on("message", async (message) => {
      switch (message) {
        case "kill": {
          logger.debug(
            "child process has the kill message, destroying the strapi instance and sending the killed process message"
          );
          await watcher.close();
          await strapiInstance.destroy();
          if (webpackWatcher) {
            webpackWatcher.close();
          }
          process.send?.("killed");
          break;
        }
      }
    });
    strapiInstance.start();
  }
};
export {
  build as b,
  develop as d,
  handleUnexpectedError as h,
  index as i
};
//# sourceMappingURL=index-94b44fa8.mjs.map
