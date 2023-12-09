"use strict";
const helperPlugin = require("@strapi/helper-plugin");
const icons = require("@strapi/icons");
const __variableDynamicImportRuntimeHelper = (glob, path) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(reject.bind(null, new Error("Unknown variable dynamic import: " + path)));
  });
};
const name$1 = "@strapi/plugin-documentation";
const version = "4.15.5";
const description = "Create an OpenAPI Document and visualize your API with SWAGGER UI.";
const repository = {
  type: "git",
  url: "https://github.com/strapi/strapi.git",
  directory: "packages/plugins/documentation"
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
  "test:front": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js",
  "test:front:watch": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js --watchAll",
  "test:unit": "jest --verbose",
  "test:unit:watch": "run -T jest --watch",
  watch: "pack-up watch"
};
const dependencies = {
  "@strapi/design-system": "1.13.2",
  "@strapi/helper-plugin": "4.15.5",
  "@strapi/icons": "1.13.2",
  "@strapi/utils": "4.15.5",
  bcryptjs: "2.4.3",
  cheerio: "^1.0.0-rc.12",
  formik: "2.4.0",
  "fs-extra": "10.0.0",
  immer: "9.0.19",
  "koa-static": "^5.0.0",
  lodash: "4.17.21",
  "path-to-regexp": "6.2.1",
  "react-helmet": "^6.1.0",
  "react-intl": "6.4.1",
  "react-query": "3.39.3",
  "swagger-ui-dist": "4.19.0",
  yaml: "1.10.2",
  yup: "0.32.9"
};
const devDependencies = {
  "@apidevtools/swagger-parser": "^10.1.0",
  "@strapi/pack-up": "4.15.5",
  "@strapi/strapi": "4.15.5",
  "@testing-library/react": "14.0.0",
  "@testing-library/user-event": "14.4.3",
  msw: "1.3.0",
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
  displayName: "Documentation",
  name: "documentation",
  description: "Create an OpenAPI Document and visualize your API with SWAGGER UI.",
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
const PERMISSIONS = {
  // This permission regards the main component (App) and is used to tell
  // If the plugin link should be displayed in the menu
  // And also if the plugin is accessible. This use case is found when a user types the url of the
  // plugin directly in the browser
  main: [
    { action: "plugin::documentation.read", subject: null },
    { action: "plugin::documentation.settings.regenerate", subject: null },
    { action: "plugin::documentation.settings.update", subject: null }
  ],
  open: [
    { action: "plugin::documentation.read", subject: null },
    { action: "plugin::documentation.settings.regenerate", subject: null }
  ],
  regenerate: [{ action: "plugin::documentation.settings.regenerate", subject: null }],
  update: [{ action: "plugin::documentation.settings.update", subject: null }]
};
const pluginId = pluginPkg.name.replace(/^@strapi\/plugin-/i, "");
const name = pluginPkg.strapi.name;
const index = {
  register(app) {
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: icons.Information,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Documentation"
      },
      permissions: PERMISSIONS.main,
      async Component() {
        const component = await Promise.resolve().then(() => require("./index-201fd171.js"));
        return component;
      }
    });
    app.registerPlugin({
      id: pluginId,
      name
    });
  },
  bootstrap(app) {
    app.addSettingsLink("global", {
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Documentation"
      },
      id: "documentation",
      to: `/settings/${pluginId}`,
      async Component() {
        const component = await Promise.resolve().then(() => require("./index-ddb7c40e.js"));
        return component;
      },
      permissions: PERMISSIONS.main
    });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => Promise.resolve().then(() => require("./ar-3945178e.js")), "./translations/cs.json": () => Promise.resolve().then(() => require("./cs-053272e2.js")), "./translations/de.json": () => Promise.resolve().then(() => require("./de-09853142.js")), "./translations/dk.json": () => Promise.resolve().then(() => require("./dk-05d66fde.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-70db76ff.js")), "./translations/es.json": () => Promise.resolve().then(() => require("./es-497d8815.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("./fr-24238f91.js")), "./translations/id.json": () => Promise.resolve().then(() => require("./id-e9ab0af3.js")), "./translations/it.json": () => Promise.resolve().then(() => require("./it-5255d492.js")), "./translations/ko.json": () => Promise.resolve().then(() => require("./ko-34e7eb26.js")), "./translations/ms.json": () => Promise.resolve().then(() => require("./ms-63bb66e1.js")), "./translations/nl.json": () => Promise.resolve().then(() => require("./nl-0319020c.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("./pl-2d57c604.js")), "./translations/pt-BR.json": () => Promise.resolve().then(() => require("./pt-BR-cf80ef96.js")), "./translations/pt.json": () => Promise.resolve().then(() => require("./pt-b91837bc.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("./ru-91348271.js")), "./translations/sk.json": () => Promise.resolve().then(() => require("./sk-10c03ab1.js")), "./translations/sv.json": () => Promise.resolve().then(() => require("./sv-e5237308.js")), "./translations/th.json": () => Promise.resolve().then(() => require("./th-200a02f1.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("./tr-fd36715f.js")), "./translations/uk.json": () => Promise.resolve().then(() => require("./uk-cb462605.js")), "./translations/vi.json": () => Promise.resolve().then(() => require("./vi-d2e2e100.js")), "./translations/zh-Hans.json": () => Promise.resolve().then(() => require("./zh-Hans-c2e4b737.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("./zh-8da2191f.js")) }), `./translations/${locale}.json`).then(({ default: data }) => {
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
exports.PERMISSIONS = PERMISSIONS;
exports.index = index;
exports.pluginId = pluginId;
//# sourceMappingURL=index-688ab74a.js.map
