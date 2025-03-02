import { prefixPluginTranslations } from "@strapi/helper-plugin";
import { Information } from "@strapi/icons";
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
const exports = {
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
  exports,
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
      icon: Information,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: "Documentation"
      },
      permissions: PERMISSIONS.main,
      async Component() {
        const component = await import("./index-baadbc12.mjs");
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
        const component = await import("./index-e92a8825.mjs");
        return component;
      },
      permissions: PERMISSIONS.main
    });
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-a504b634.mjs"), "./translations/cs.json": () => import("./cs-feb7f04c.mjs"), "./translations/de.json": () => import("./de-a33e1fea.mjs"), "./translations/dk.json": () => import("./dk-ed9fcdcf.mjs"), "./translations/en.json": () => import("./en-96395a32.mjs"), "./translations/es.json": () => import("./es-22de55e3.mjs"), "./translations/fr.json": () => import("./fr-70c3898d.mjs"), "./translations/id.json": () => import("./id-e9e00780.mjs"), "./translations/it.json": () => import("./it-28ef2963.mjs"), "./translations/ko.json": () => import("./ko-a29301ee.mjs"), "./translations/ms.json": () => import("./ms-87588bdb.mjs"), "./translations/nl.json": () => import("./nl-91bcd809.mjs"), "./translations/pl.json": () => import("./pl-7d7fe7b2.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-0024d4be.mjs"), "./translations/pt.json": () => import("./pt-9b66f3d5.mjs"), "./translations/ru.json": () => import("./ru-468d9a30.mjs"), "./translations/sk.json": () => import("./sk-01b7713b.mjs"), "./translations/sv.json": () => import("./sv-7edbe28d.mjs"), "./translations/th.json": () => import("./th-4fcead7f.mjs"), "./translations/tr.json": () => import("./tr-8290d257.mjs"), "./translations/uk.json": () => import("./uk-bf914720.mjs"), "./translations/vi.json": () => import("./vi-ddc8357e.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-6cefb513.mjs"), "./translations/zh.json": () => import("./zh-7b489db7.mjs") }), `./translations/${locale}.json`).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, pluginId),
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
export {
  PERMISSIONS as P,
  index as i,
  pluginId as p
};
//# sourceMappingURL=index-972b74ea.mjs.map
