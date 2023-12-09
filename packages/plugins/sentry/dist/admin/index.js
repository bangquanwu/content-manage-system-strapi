"use strict";
const helperPlugin = require("@strapi/helper-plugin");
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const name$1 = "@strapi/plugin-sentry";
const version = "4.15.5";
const description = "Send Strapi error events to Sentry";
const repository = {
  type: "git",
  url: "https://github.com/strapi/strapi.git",
  directory: "packages/plugins/sentry"
};
const license = "SEE LICENSE IN LICENSE";
const author = {
  name: "Strapi Solutions SAS",
  email: "hi@strapi.io",
  url: "https://strapi.io"
};
const maintainers = [
  {
    name: "Strapi Solutions SAS",
    email: "hi@strapi.io",
    url: "https://strapi.io"
  }
];
const exports$1 = {
  "./strapi-admin": {
    source: "./admin/src/index.js",
    "import": "./dist/admin/index.mjs",
    require: "./dist/admin/index.js",
    "default": "./dist/admin/index.js"
  },
  "./strapi-server": {
    source: "./strapi-server.js",
    require: "./strapi-server.js",
    "default": "./strapi-server.js"
  },
  "./package.json": "./package.json"
};
const scripts = {
  build: "pack-up build",
  clean: "run -T rimraf dist",
  lint: "run -T eslint .",
  prepublishOnly: "yarn clean && yarn build",
  "test:unit": "run -T jest",
  "test:unit:watch": "run -T jest --watch",
  watch: "pack-up watch"
};
const dependencies = {
  "@sentry/node": "6.19.7",
  "@strapi/design-system": "1.13.2",
  "@strapi/helper-plugin": "4.15.5",
  "@strapi/icons": "1.13.2"
};
const devDependencies = {
  "@strapi/pack-up": "4.15.5",
  "@strapi/strapi": "4.15.5",
  react: "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "5.3.4",
  "styled-components": "5.3.3"
};
const peerDependencies = {
  "@strapi/strapi": "^4.0.0",
  react: "^17.0.0 || ^18.0.0",
  "react-dom": "^17.0.0 || ^18.0.0",
  "react-router-dom": "^5.2.0",
  "styled-components": "^5.2.1"
};
const engines = {
  node: ">=18.0.0 <=20.x.x",
  npm: ">=6.0.0"
};
const strapi = {
  name: "sentry",
  displayName: "Sentry",
  description: "Send Strapi error events to Sentry.",
  kind: "plugin"
};
const pluginPkg = {
  name: name$1,
  version,
  description,
  repository,
  license,
  author,
  maintainers,
  exports: exports$1,
  scripts,
  dependencies,
  devDependencies,
  peerDependencies,
  engines,
  strapi
};
const pluginId = pluginPkg.name.replace(/^@strapi\/plugin-/i, "");
const name = pluginPkg.strapi.name;
const index = {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      name
    });
  },
  bootstrap() {
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/dk.json": () => Promise.resolve().then(() => require("../_chunks/dk-00b47489.js")), "./translations/en.json": () => Promise.resolve().then(() => require("../_chunks/en-2dbaca4a.js")), "./translations/es.json": () => Promise.resolve().then(() => require("../_chunks/es-4352c0b3.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("../_chunks/fr-81925960.js")), "./translations/ko.json": () => Promise.resolve().then(() => require("../_chunks/ko-5ab994e9.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("../_chunks/pl-5065555b.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("../_chunks/ru-c00f24a0.js")), "./translations/sv.json": () => Promise.resolve().then(() => require("../_chunks/sv-a8d028fb.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("../_chunks/tr-de905f5b.js")), "./translations/vi.json": () => Promise.resolve().then(() => require("../_chunks/vi-6d3d2db0.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("../_chunks/zh-ac6dac24.js")) }), `./translations/${locale}.json`).then(({ default: data }) => {
          return {
            data: helperPlugin.prefixPluginTranslations(data, pluginId),
            locale
          };
        }).catch(() => {
          return {
            data: {},
            locale
          };
        });
      })
    );
    return Promise.resolve(importedTrads);
  }
};
module.exports = index;
//# sourceMappingURL=index.js.map
