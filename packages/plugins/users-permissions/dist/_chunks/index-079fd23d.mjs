import { prefixPluginTranslations } from "@strapi/helper-plugin";
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
  exports,
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
            const component = await import("./index-90e8a43b.mjs");
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
            const component = await import("./index-6ac22f91.mjs");
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
            const component = await import("./index-d4e4505b.mjs");
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
            const component = await import("./index-6a71bd2c.mjs");
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
        return __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-56e57465.mjs"), "./translations/cs.json": () => import("./cs-0521a3c8.mjs"), "./translations/de.json": () => import("./de-84fed33d.mjs"), "./translations/dk.json": () => import("./dk-d8302360.mjs"), "./translations/en.json": () => import("./en-a610d7d0.mjs"), "./translations/es.json": () => import("./es-9d9ad31c.mjs"), "./translations/fr.json": () => import("./fr-0722d6cd.mjs"), "./translations/id.json": () => import("./id-03eb1a4c.mjs"), "./translations/it.json": () => import("./it-95fb8dcc.mjs"), "./translations/ja.json": () => import("./ja-557e03ee.mjs"), "./translations/ko.json": () => import("./ko-d3b19f18.mjs"), "./translations/ms.json": () => import("./ms-b8a16476.mjs"), "./translations/nl.json": () => import("./nl-fb114313.mjs"), "./translations/pl.json": () => import("./pl-5d70d4e8.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-075f271a.mjs"), "./translations/pt.json": () => import("./pt-95c2c76f.mjs"), "./translations/ru.json": () => import("./ru-625a0fe5.mjs"), "./translations/sk.json": () => import("./sk-495ecbe4.mjs"), "./translations/sv.json": () => import("./sv-60a1fabf.mjs"), "./translations/th.json": () => import("./th-f633d0ed.mjs"), "./translations/tr.json": () => import("./tr-16211986.mjs"), "./translations/uk.json": () => import("./uk-f1fae414.mjs"), "./translations/vi.json": () => import("./vi-e8fd97e4.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-68e4b43a.mjs"), "./translations/zh.json": () => import("./zh-284557f3.mjs") }), `./translations/${locale}.json`).then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, "users-permissions"),
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
  getTrad as g,
  index as i
};
//# sourceMappingURL=index-079fd23d.mjs.map
