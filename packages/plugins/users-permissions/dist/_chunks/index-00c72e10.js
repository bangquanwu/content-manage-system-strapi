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
const name$1 = "@strapi/plugin-users-permissions";
const version = "4.15.5";
const description = "Protect your API with a full-authentication process based on JWT";
const repository = {
  type: "git",
  url: "git://github.com/strapi/strapi.git"
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
  "test:front:ce": "run -T cross-env IS_EE=false jest --config ./jest.config.front.js",
  "test:front:watch": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js --watchAll",
  "test:front:watch:ce": "run -T cross-env IS_EE=false jest --config ./jest.config.front.js --watchAll",
  "test:unit": "run -T jest",
  "test:unit:watch": "run -T jest --watch",
  watch: "pack-up watch"
};
const dependencies = {
  "@strapi/design-system": "1.13.2",
  "@strapi/helper-plugin": "4.15.5",
  "@strapi/icons": "1.13.2",
  "@strapi/utils": "4.15.5",
  bcryptjs: "2.4.3",
  formik: "2.4.0",
  "grant-koa": "5.4.8",
  immer: "9.0.19",
  jsonwebtoken: "9.0.0",
  "jwk-to-pem": "2.0.5",
  koa: "2.13.4",
  "koa2-ratelimit": "^1.1.2",
  lodash: "4.17.21",
  "prop-types": "^15.8.1",
  purest: "4.0.2",
  "react-intl": "6.4.1",
  "react-query": "3.39.3",
  "react-redux": "8.1.1",
  "url-join": "4.0.1",
  yup: "0.32.9"
};
const devDependencies = {
  "@strapi/pack-up": "4.15.5",
  "@strapi/strapi": "4.15.5",
  "@testing-library/dom": "9.2.0",
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
  displayName: "Roles & Permissions",
  name: "users-permissions",
  description: "Protect your API with a full authentication process based on JWT. This plugin comes also with an ACL strategy that allows you to manage the permissions between the groups of users.",
  required: true,
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
  // Roles
  accessRoles: [
    { action: "plugin::users-permissions.roles.create", subject: null },
    { action: "plugin::users-permissions.roles.read", subject: null }
  ],
  createRole: [{ action: "plugin::users-permissions.roles.create", subject: null }],
  deleteRole: [{ action: "plugin::users-permissions.roles.delete", subject: null }],
  readRoles: [{ action: "plugin::users-permissions.roles.read", subject: null }],
  updateRole: [{ action: "plugin::users-permissions.roles.update", subject: null }],
  // AdvancedSettings
  readAdvancedSettings: [
    { action: "plugin::users-permissions.advanced-settings.read", subject: null }
  ],
  updateAdvancedSettings: [
    { action: "plugin::users-permissions.advanced-settings.update", subject: null }
  ],
  // Emails
  readEmailTemplates: [{ action: "plugin::users-permissions.email-templates.read", subject: null }],
  updateEmailTemplates: [
    { action: "plugin::users-permissions.email-templates.update", subject: null }
  ],
  // Providers
  readProviders: [{ action: "plugin::users-permissions.providers.read", subject: null }],
  updateProviders: [{ action: "plugin::users-permissions.providers.update", subject: null }]
};
const pluginId = pluginPkg.name.replace(/^@strapi\/plugin-/i, "");
const getTrad = (id) => `${pluginId}.${id}`;
const name = pluginPkg.strapi.name;
const index = {
  register(app) {
    app.createSettingSection(
      {
        id: "users-permissions",
        intlLabel: {
          id: getTrad("Settings.section-label"),
          defaultMessage: "Users & Permissions plugin"
        }
      },
      [
        {
          intlLabel: {
            id: "global.roles",
            defaultMessage: "Roles"
          },
          id: "roles",
          to: `/settings/users-permissions/roles`,
          async Component() {
            const component = await Promise.resolve().then(() => require("./index-50ce8bcd.js"));
            return component;
          },
          permissions: PERMISSIONS.accessRoles
        },
        {
          intlLabel: {
            id: getTrad("HeaderNav.link.providers"),
            defaultMessage: "Providers"
          },
          id: "providers",
          to: `/settings/users-permissions/providers`,
          async Component() {
            const component = await Promise.resolve().then(() => require("./index-b5fc72d9.js"));
            return component;
          },
          permissions: PERMISSIONS.readProviders
        },
        {
          intlLabel: {
            id: getTrad("HeaderNav.link.emailTemplates"),
            defaultMessage: "Email templates"
          },
          id: "email-templates",
          to: `/settings/users-permissions/email-templates`,
          async Component() {
            const component = await Promise.resolve().then(() => require("./index-953936f5.js"));
            return component;
          },
          permissions: PERMISSIONS.readEmailTemplates
        },
        {
          intlLabel: {
            id: getTrad("HeaderNav.link.advancedSettings"),
            defaultMessage: "Advanced Settings"
          },
          id: "advanced-settings",
          to: `/settings/users-permissions/advanced-settings`,
          async Component() {
            const component = await Promise.resolve().then(() => require("./index-a4a41ff5.js"));
            return component;
          },
          permissions: PERMISSIONS.readAdvancedSettings
        }
      ]
    );
    app.registerPlugin({
      id: "users-permissions",
      name
    });
  },
  bootstrap() {
  },
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => Promise.resolve().then(() => require("./ar-20af7bfe.js")), "./translations/cs.json": () => Promise.resolve().then(() => require("./cs-6d7de06a.js")), "./translations/de.json": () => Promise.resolve().then(() => require("./de-4af0884b.js")), "./translations/dk.json": () => Promise.resolve().then(() => require("./dk-21e25c4b.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-746a275e.js")), "./translations/es.json": () => Promise.resolve().then(() => require("./es-b6ae0f5e.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("./fr-dd77fc67.js")), "./translations/id.json": () => Promise.resolve().then(() => require("./id-c19698f1.js")), "./translations/it.json": () => Promise.resolve().then(() => require("./it-06b8d8a3.js")), "./translations/ja.json": () => Promise.resolve().then(() => require("./ja-e92e9903.js")), "./translations/ko.json": () => Promise.resolve().then(() => require("./ko-5148326d.js")), "./translations/ms.json": () => Promise.resolve().then(() => require("./ms-1e62b726.js")), "./translations/nl.json": () => Promise.resolve().then(() => require("./nl-66ef33aa.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("./pl-7aa4933a.js")), "./translations/pt-BR.json": () => Promise.resolve().then(() => require("./pt-BR-820fcd20.js")), "./translations/pt.json": () => Promise.resolve().then(() => require("./pt-a470d4e6.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("./ru-cd0d1ac9.js")), "./translations/sk.json": () => Promise.resolve().then(() => require("./sk-8334fbf7.js")), "./translations/sv.json": () => Promise.resolve().then(() => require("./sv-137a2f79.js")), "./translations/th.json": () => Promise.resolve().then(() => require("./th-7fe328ef.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("./tr-eae92999.js")), "./translations/uk.json": () => Promise.resolve().then(() => require("./uk-0c33935a.js")), "./translations/vi.json": () => Promise.resolve().then(() => require("./vi-b5d581a1.js")), "./translations/zh-Hans.json": () => Promise.resolve().then(() => require("./zh-Hans-baae8c78.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("./zh-9babf307.js")) }), `./translations/${locale}.json`).then(({ default: data }) => {
          return {
            data: helperPlugin.prefixPluginTranslations(data, "users-permissions"),
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
exports.getTrad = getTrad;
exports.index = index;
//# sourceMappingURL=index-00c72e10.js.map
